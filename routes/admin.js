const express = require("express");
const app = express();
const router = express.Router();

const upload = require("../middleware/multer");

const {
  loginPage,
  adminLogin,
  logout,
  dashboard,
  settings,
} = require("../controllers/userController");
const {
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
  updateSettings,
} = require("../controllers/userController");
const {
  allCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const {
  allArticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

const { allComments } = require("../controllers/commentController");
const isLoggedIn = require("../middleware/isloggedin");
const isAdmin = require("../middleware/isAdmin");

//Login routes
router.get("/", loginPage);
router.post("/index", adminLogin);

router.get("/logout", isLoggedIn, logout);

router.get("/dashboard", isLoggedIn, dashboard);
router.get("/settings", isLoggedIn, isAdmin, settings);
router.post("/save-settings", isLoggedIn, isAdmin,upload.single("website_logo"),updateSettings);

// User CRUD routes
router.get("/users", isLoggedIn, isAdmin,allUser);
router.get("/add-user", isLoggedIn, isAdmin, addUserPage);
router.post("/add-user", isLoggedIn, isAdmin, addUser);
router.get("/update-user/:id", isLoggedIn, isAdmin, updateUserPage);
router.post("/update-user/:id", isLoggedIn, isAdmin, updateUser);
router.delete("/delete-user/:id", isLoggedIn, isAdmin, deleteUser);

// Category CRUD routes
router.get("/category", isLoggedIn, isAdmin, allCategory);
router.get("/add-category", isLoggedIn, isAdmin, addCategoryPage);
router.post("/add-category", isLoggedIn, isAdmin, addCategory);
router.get("/update-category/:id", isLoggedIn, isAdmin, updateCategoryPage);
router.post("/update-category/:id", isLoggedIn, isAdmin, updateCategory);
router.delete("/delete-category/:id", isLoggedIn, isAdmin, deleteCategory);

// Article CRUD routes
router.get("/article", isLoggedIn, allArticle);
router.get("/add-article", isLoggedIn, addArticlePage);
router.post("/add-article", isLoggedIn, upload.single("image"), addArticle);
router.get("/update-article/:id", isLoggedIn, updateArticlePage);
router.post(
  "/update-article/:id",
  isLoggedIn,
  upload.single("image"),
  updateArticle
);
router.delete("/delete-article/:id", isLoggedIn, deleteArticle);

// Comment CRUD routes
router.get("/comments", isLoggedIn, allComments);
// router.get('/delete-comment/:id',isLoggedIn,isAdmin,deleteComment); // commented out for now

router.use(isLoggedIn , (req ,res, next) =>{
    res.status(404).render('admin/404' , {
       message : 'Page Not Found' ,
       role : req.role,
    })
})
router.use(isLoggedIn , (err,req ,res, next) =>{
    console.error(err.stack);
    res.status(500).render('admin/500' , {
       message : err.message || "Internal Server Error",
       role : req.role,
    })
})

module.exports = router;
