const userModel = require("../models/User");
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

const adminLogin = async (req, res) => {
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
    res.status(500).send("inTernal server error");
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/");
};

const dashboard = async (req, res) => {
  res.render("admin/dashboard", { role: req.role , fullname : req.fullname});
};

const settings = async (req, res) => {
  res.render("admin/settings", { role: req.role });
};

// User CRUD Routes Handler
const allUser = async (req, res) => {
  const users = await userModel.find();
  res.render("admin/users/index", { users, role: req.role });
};

const addUserPage = (req, res) => {
  res.render("admin/users/create", { role: req.role });
};

const addUser = async (req, res) => {
  await userModel.create(req.body);
  res.redirect("/admin/users");
};

const updateUserPage = async (req, res) => {
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
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
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
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
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
};
