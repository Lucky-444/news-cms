const userModel = require("../models/User");
const categoryModel = require("../models/Category");
const newsModel = require("../models/News");
const commentModel = require("../models/Comment");
const settingsModel = require("../models/Settings");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

// Login Routes Handler
const loginPage = (req, res) => {
  res.render("admin/login", {
    layout: false,
  });
};

const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).send("invalid Username");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("passWord  iS In correct");
    }

    const jwtData = { id: user._id, fullname: user.fullname, role: user.role };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/");
};

const dashboard = async (req, res, next) => {
  try {
    let articleCount;
    articleCount = await newsModel.countDocuments();
    if (req.role == "admin") {
      // if the user is admin
      // get the count of all articles
      articleCount = await newsModel.countDocuments();
    } else
      articleCount = await newsModel.countDocuments({
        author: req.id,
      }); // get the count of articles written by the user
    const userCount = await userModel.countDocuments();
    const categoryCount = await categoryModel.countDocuments();

    res.render("admin/dashboard", {
      role: req.role,
      fullname: req.fullname,
      articleCount,
      userCount,
      categoryCount,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const settings = async (req, res, next) => {
  res.render("admin/settings", { role: req.role });
};
const updateSettings = async (req, res, next) => {
  try {
    const { website_title, website_description } = req.body;

    const website_logo = req.file ? req.file.filename : null;
    const settings = await settingsModel.findOneAndUpdate(
      {},
      {
        website_description,
        website_logo,
        website_title,
      },
      {
        new : true,
        upsert : true,
      }
    );

    await settings.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// User CRUD Routes Handler
const allUser = async (req, res, next) => {
  const users = await userModel.find();
  res.render("admin/users/index", { users, role: req.role });
};

const addUserPage = (req, res) => {
  res.render("admin/users/create", { role: req.role });
};

const addUser = async (req, res, next) => {
  try {
    await userModel.create(req.body);
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUserPage = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).send("User ID is required");
    }
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("admin/users/update", { user, role: req.role });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { fullname, password, role } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.fullname = fullname || user.fullname;
    if (password) {
      user.password = password;
    }

    user.role = role || user.role;

    await user.save();
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  loginPage,
  adminLogin,
  logout,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
  dashboard,
  settings,
  updateSettings,
};

