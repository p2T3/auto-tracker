const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Auto, Driver } = require("../models");

router.get("/vehicle", (req, res) => {

  Auto.findAll({

    // where: {
      
    //  id: req.params.id
    // },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      // {
      //   model: Owner,
      //   attributes: ["id", "first_name", "last_name", "email"],
      // },
      {
        model: Driver,
        attributes: ["id", "first_name", "last_name", "relation"],
      },
    ],
  })
  .then(dbAutoData => {
    console.log( "dbAutoData:", dbAutoData );
    // serialize data before passing to template
    const autos = dbAutoData.map(auto => auto.get({ plain: true }));
    console.log( "Autos:", autos );
    res.render('vehicle-dashboard', autos);
    //res.render('vehicle-dashboard', { autos, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
