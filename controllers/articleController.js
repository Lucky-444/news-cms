
const categoryModel = require("../models/Category");
const newsModel = require("../models/News");
const userModel = require("../models/User");
const fs = require("fs");
const path = require("path");

const allArticle = async (req, res, next) => {
  try {
    if (!req.id) {
      return res.status(404).send("Article not found");
    }

    let articles;
    if (req.role === "admin") {
      articles = await newsModel
        .find()
        .populate("category", "name")
        .populate("author", "fullname");
    } else {
      articles = await newsModel
        .find({ author: req.id })
        .populate("category", "name")
        .populate("author", "fullname");
    }



    res.render("admin/articles", { role: req.role, articles });
  } catch (error) {
    next(error);
  }
};

const addArticlePage = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    const users = await userModel.find();

    res.render("admin/articles/create", { role: req.role, categories });
  } catch (error) {
    console.log(error);
  }
};

const addArticle = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    const article = new newsModel({
      title,
      content,
      category,
      author: req.id,
      image: req.file.filename,
    });

    await article.save();
    console.log(article);
    res.redirect("/admin/article");
  } catch (error) {
    next(error);
  }
};

const updateArticlePage = async (req, res, next) => {
  try {
    const article = await newsModel
      .findById(req.params.id)
      .populate("category", "name")
      .populate("author", "fullname");
    if (!article) {
      // return res.status(404).send("Article not found");

      const error = new Error("Article Not Found")
      error.status = 404;
      return next(error);
    }

    console.log(article);

    const categories = await categoryModel.find();

    res.render("admin/articles/update", {
      role: req.role,
      article,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const article = await newsModel.findById(req.params.id);
    if (!article) {
      const error = new Error("Article Not Found")
      error.status = 404;
      return next(error);
    }

    if (req.role === "author") {
      if (req.id != article.author._id) {
        return res
          .status(404)
          .send("You are not allowed to update this article");
      }
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    article.category = req.body.category || article.category;
    if (req.file) {
      const imagePath = path.join(
        __dirname,
        "../public/uploads/" + article.image
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(err);
        }
      }); //Delete the Old Image and
      //after that add the new image in mongoose
      article.image = req.file.filename;
    }

    await article.save();

    res.redirect("/admin/article");
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await newsModel.findById(req.params.id);
    if (!article) {
      res.status(404).send("Article not found");
    }
    if (req.role === "author") {
      if (req.id != article.author._id) {
        return res
          .status(404)
          .send("You are not allowed to update this article");
      }
    }

    const imagePath = path.join(
      __dirname,
      "../public/uploads/" + article.image
    );
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(err);
      }
    }); //Delete the Old Image and
    // await article.remove();
    // or
    await article.deleteOne();

    res
      .status(201)
      .json({ message: "Article deleted successfully", success: true });
  } catch (error) {
    next(error);
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
