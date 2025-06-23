const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
dotenv.config();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname ,'public')));
app.use(expressLayouts);
app.set('layout', 'layout');


//View Engines
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

//Database connection
mongoose.connect(process.env.LOCAL_MONGO_URI);



const port = process.env.PORT || 3000;



app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
