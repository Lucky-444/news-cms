const categoryModel = require("../models/Category");

const allCategory = async (req, res) => {
      res.render("admin/categories/index");
};

const addCategoryPage = (req, res) => {
        res.render("admin/categories/create");
};

const addCategory = async (req, res) => {
        try {
                const category = new categoryModel(req.body);
                await category.save();
                res.redirect("/admin/category");
        } catch (error) {
                console.log(error);
        }
};


const updateCategoryPage = async (req, res) => {
        try {
                const category = await categoryModel.findById(req.params.id);
                res.render("admin/update-category", { category });
        } catch (error) {
                console.log(error);
        }
};

const updateCategory = async (req, res) => {
        try {
                await categoryModel.findByIdAndUpdate(req.params.id, req.body);
                res.redirect("/admin/category");
        } catch (error) {
                console.log(error);
        }
};

const deleteCategory = async (req, res) => {
        try {
                await categoryModel.findByIdAndDelete(req.params.id);
                res.redirect("/admin/category");
        } catch (error) {
                console.log(error);
        }
};



module.exports = {
        allCategory,
        addCategoryPage,
        addCategory,
        updateCategoryPage,
        updateCategory,
        deleteCategory
};


