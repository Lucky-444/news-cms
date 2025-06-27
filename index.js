const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const frontend = require('./routes/frontend')
const admin = require('./routes/admin')
dotenv.config();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname ,'public')));
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout', 'layout');


//View Engines
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

//Database connection
mongoose.connect(process.env.LOCAL_MONGO_URI);



const port = process.env.PORT || 3000;

// Routes Handle
// frontend
app.use('/' ,frontend);


// admin
// Layout of admin is not same as frontend
app.use('/admin' ,(req , res , next) => {
  res.locals.layout = 'admin/layout'; 
  next();
});
app.use('/admin' , admin);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
