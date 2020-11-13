const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Auto, Driver } = require("../models");

//////////////////////////////////////////////////////////////////////////////////////
// Route for the 'vehicle' dashboard page.
router.get("/vehicle", (req, res) => {
  Auto.findAll({
    where: {
      owner_id: req.session.owner_id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Driver,
        attributes: ["id", "first_name", "last_name", "relation"],
      },
    ],
  })
    .then((dbAutoData) => {
      // serialize data before passing to template
      const autos = dbAutoData.map((auto) => auto.get({ plain: true }));

      console.log("AUTOS", autos);
      // res.render("vehicle-dashboard", autos);
      res.render("vehicle-dashboard", { autos, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
// Route for the 'driver' dashboard page.
router.get("/driver", (req, res) => {
  Auto.findAll({
    where: {
      owner_id: req.session.owner_id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Driver,
        attributes: ["id", "first_name", "last_name", "relation"],
      },
    ],
  })
    .then((dbAutoData) => {
      // serialize data before passing to template
      const drivers = dbAutoData.map((auto) => auto.get({ plain: true }));

      // res.render("driver-dashboard", autos);
      res.render("driver-dashboard", { drivers, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
