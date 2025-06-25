const categoryModel = require("../models/Category");

const allCategory = async (req, res) => {
  const categories = await categoryModel.find();
  res.render("admin/categories/index", { categories, role: req.role });
};

const addCategoryPage = (req, res) => {
  res.render("admin/categories/create", { role: req.role });
};

const addCategory = async (req, res) => {
  try {
    await categoryModel.create(req.body);
    res.redirect("/admin/category");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateCategoryPage = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if(!category){
      return res.status(404).send("Category not found");
    }
    res.render("admin/categories/update", { category, role: req.role });
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};



const updateCategory = async (req, res) => {
  try{
    const id = req.params.id;
    const category = await categoryModel.findById(id);
    if(!category){
      return res.status(404).send("Category not found");
    }
    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;
    await category.save();
    res.redirect("/admin/category");
  }catch(error){
    console.log(error);
    return res.status(404).send(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if(!category){
      return res.status(404).send("Category not found");
    }
    return res.status(201).json({ message: "Category deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  allCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
};
