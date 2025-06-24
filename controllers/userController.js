const userModel = require("../models/User");

// Login Routes Handler
const loginPage = (req, res) => {
  res.render("admin/login",{
    layout : false,
  });
};




const adminLogin = (req, res) => {};

const logout = (req, res) => {};


const dashboard = async(req, res) => {
  res.render('admin/dashboard');
}

const settings = async(req, res) => {
  res.render('admin/settings');
}

// User CRUD Routes Handler

const allUser = (req, res) => {
  res.render("admin/users/index");
};

const addUserPage = (req, res) => {
  res.render("admin/users/create");
};

const addUser = (req, res) => {};

const updateUserPage = (req, res) => {
  res.render("admin/users/update");
};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

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
