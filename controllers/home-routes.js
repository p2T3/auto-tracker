const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Auto, Driver } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  console.log("logged in:", req.session.loggedIn);
  if (req.session.loggedIn) {
    res.redirect("/vehicle");
    return;
  }

  res.render("login", {
    loggedIn: true,
  });

  // res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
