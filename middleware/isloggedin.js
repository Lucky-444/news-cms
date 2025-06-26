const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/admin/");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded;
    req.id = decoded.id;
    req.role = decoded.role;
    req.fullname = decoded.fullname;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send("You are not authorized to access the page. Please login first.");
  }
};

module.exports = isLoggedIn;
