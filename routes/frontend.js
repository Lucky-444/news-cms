const express = require("express");
const app = express();
const router = express.Router();

const {
  index,
  articleByCategories,
  singleArticle,
  search,
  author,
  addComment,
} = require("../controllers/siteController");

router.get("/", index);

router.get("/category/:name", articleByCategories);

router.get("/single/:id", singleArticle);

router.get("/search", search);

router.get("/author/:name", author);

router.post("/single/:id", addComment);

module.exports = router;
