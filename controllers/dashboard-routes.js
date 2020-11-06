const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Auto, Driver } = require("../models");

router.get("/vehicle-dashboard", (req, res) => {
  res.render("vehicle-dashboard");
});

module.exports = router;
