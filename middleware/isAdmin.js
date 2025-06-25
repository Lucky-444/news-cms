const isAdmin = async (req, res, next) => {
  try {
    if (req.role === "admin") {
      next();
    } else {
      res.redirect("/admin/dashboard");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = isAdmin;
