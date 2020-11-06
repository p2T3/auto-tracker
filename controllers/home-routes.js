const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Auto, Driver } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/vehicle-dashboard", (req, res) => {
  res.render("vehicle-dashboard");
});

module.exports = router;
