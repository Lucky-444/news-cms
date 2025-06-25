const categoryModel = require("../models/Category");
const newsModel = require("../models/News");
const userModel = require("../models/User");

const allArticle = async (req, res) => {
  try {
    // const news = await newsModel.find().populate("category").populate("author");
    res.render("admin/articles", { role: req.role });
  } catch (error) {
    console.log(error);
  }
};

const addArticlePage = async (req, res) => {
  try {
    // const categories = await categoryModel.find();
    // const users = await userModel.find();
    // res.render("admin/articles/create", {news});
    res.render("admin/articles/create", { role: req.role });
  } catch (error) {
    console.log(error);
  }
};

const addArticle = async (req, res) => {
  try {
    const article = new newsModel(req.body);
    await article.save();
    res.redirect("/admin/article");
  } catch (error) {
    console.log(error);
  }
};

const updateArticlePage = async (req, res) => {
  try {
    // const article = await newsModel.findById(req.params.id).populate("category").populate("author");
    // const categories = await categoryModel.find();
    // const users = await userModel.find();
    // res.render("admin/articles/update", { article , categories , users });
    res.render("admin/articles/update", { role: req.role });
  } catch (error) {
    console.log(error);
  }
};

const updateArticle = async (req, res) => {
  try {
    await newsModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin/article");
  } catch (error) {
    console.log(error);
  }
};

const deleteArticle = async (req, res) => {
  try {
    await newsModel.findByIdAndDelete(req.params.id);
    res.redirect("/admin/article");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allArticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
};
