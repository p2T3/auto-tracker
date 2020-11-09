const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Auto, Driver } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }

  // res.render("login", {
  //   loggedIn: true
  // });

    res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});


router.get("/vehicle", (req, res) => {
  res.render("vehicle-dashboard");
});


router.get("/driver", (req, res) => {
  res.render("driver-dashboard");
});

module.exports = router;
