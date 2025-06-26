const categoryModel = require("../models/Category");
const newsModel = require("../models/News");
const userModel = require("../models/User");

const allArticle = async (req, res) => {
  try {
    const articles = await newsModel
      .find()
      .populate("category", "name")
      .populate("author", "fullname");
    res.render("admin/articles", { role: req.role, articles });
  } catch (error) {
    console.log(error);
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

const addArticle = async (req, res) => {
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
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};





const updateArticlePage = async (req, res) => {
  try {
    const article = await newsModel.findById(req.params.id).populate("category" , "name").populate("author", "fullname");
    if(!article){
      return res.status(404).send("Article not found");
    }

    console.log(article);

    const categories = await categoryModel.find();
    
    
    res.render("admin/articles/update", { role: req.role , article , categories});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};









const updateArticle = async (req, res) => {
  try {
    const article = await newsModel.findById(req.params.id);
    if(!article){
      return res.status(404).send("Article not found");
    }


    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    article.category = req.body.category || article.category;
    if(req.file)
    article.image = req.file.filename || article.image;

    await article.save();


    res.redirect("/admin/article");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await newsModel.findByIdAndDelete(req.params.id);
    if(!article){
      res.status(404).send("Article not found" );
    }

    res.status(201).json({message : "Article deleted successfully" , success : true});
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error" , error);
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
