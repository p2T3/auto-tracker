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
      include: [{
        model: Driver,
        attributes: ["id", "first_name", "last_name", "relation", "image_url"],
      }, ],
    })
    .then((dbAutoData) => {
      const autos = dbAutoData.map((auto) => auto.get({ plain: true }));

      Driver.findAll({
          where: {
            owner_id: req.session.owner_id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        })
        .then((dbDriverData) => {
          const drivers = dbDriverData.map((driver) => driver.get({ plain: true }));

          res.render("vehicle-dashboard", { autos, drivers, loggedIn: true});
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });

      // console.log("AUTOS", autos);

      // res.render("vehicle-dashboard", { autos, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
// Route for the 'driver' dashboard page.
router.get("/driver", (req, res) => {
  Driver.findAll({
      where: {
        owner_id: req.session.owner_id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })
    .then((dbDriverData) => {
      // serialize data before passing to template
      const drivers = dbDriverData.map((driver) => driver.get({ plain: true }));

      res.render("driver-dashboard", { drivers, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;