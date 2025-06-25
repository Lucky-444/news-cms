const userModel = require("../models/User");

// Login Routes Handler
const loginPage = (req, res) => {
  res.render("admin/login", {
    layout: false,
  });
};

const adminLogin = (req, res) => {};

const logout = (req, res) => {};

const dashboard = async (req, res) => {
  res.render("admin/dashboard");
};

const settings = async (req, res) => {
  res.render("admin/settings");
};

// User CRUD Routes Handler
const allUser = async (req, res) => {
  const users = await userModel.find();
  res.render("admin/users/index", { users });
};

const addUserPage = (req, res) => {
  res.render("admin/users/create");
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
    res.render("admin/users/update", { user });
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
