const express = require('express');
const app = express();
const router = express.Router();

const { loginPage , adminLogin , logout ,dashboard ,settings } = require('../controllers/userController');
const { allUser , addUserPage , addUser , updateUserPage , updateUser , deleteUser } = require('../controllers/userController');
const { allCategory , addCategoryPage , addCategory , updateCategoryPage , updateCategory , deleteCategory } = require('../controllers/categoryController');
const { allArticle , addArticlePage , addArticle , updateArticlePage , updateArticle , deleteArticle } = require('../controllers/articleController');
const { allComments } = require('../controllers/commentController');    



//Login routes
router.get('/',loginPage);
router.post('/index',adminLogin);
router.get('/logout',logout);
router.get('/dashboard' ,dashboard);
router.get('/settings' ,settings);

// User CRUD routes
router.get('/users',allUser);
router.get('/add-user',addUserPage);
router.post('/add-user',addUser);
router.get('/update-user/:id',updateUserPage);
router.post('/update-user/:id',updateUser);
router.get('/delete-user/:id',deleteUser);


// Category CRUD routes
router.get('/category',allCategory);
router.get('/add-category',addCategoryPage);
router.post('/add-category',addCategory);
router.get('/update-category/:id',updateCategoryPage);
router.post('/update-category/:id',updateCategory);
router.get('/delete-category/:id',deleteCategory);

// Article CRUD routes
router.get('/article',allArticle);
router.get('/add-article',addArticlePage);
router.post('/add-article',addArticle);
router.get('/update-article/:id',updateArticlePage);
router.post('/update-article/:id',updateArticle);
router.get('/delete-article/:id',deleteArticle);

// Comment CRUD routes
router.get('/comments',allComments);
// router.get('/delete-comment/:id',deleteComment); // commented out for now

module.exports = router;