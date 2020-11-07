const router = require("express").Router();
const { Owner, Auto, Driver } = require("../../models");


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to get all drivers
router.get("/", (req, res) => {
  Driver.findAll({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  })
    .then((dbDriverData) => res.json(dbDriverData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to get one specific driver by ID
router.get("/:id", (req, res) => {
  Driver.findOne({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Auto,
        attributes: [
          "id",
          "make",
          "model",
          "color",
          "year",
          "mileage",
          "vin",
          "license_plate",
          "registration_expiration",
          "insurance_expiration",
          "oil_mileage",
          "tire_mileage",
        ],
      },
    ],
  })
    .then((dbDriverData) => {
      if (!dbDriverData) {
        res.status(404).json({
          message: "No driver found with this id!",
        });
        return;
      }
      res.json(dbDriverData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to add a new driver
router.post("/", (req, res) => {
  Driver.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    relation: req.body.relation,
  })
    .then((dbDriverData) => {
      // Commented out below for now until we set up a session login.

      // req.session.save(() => {
      //     req.session.user_id = dbDriverData.id;
      //     req.session.username = dbDriverData.username;
      //     req.session.loggedIn = true;

      //     res.json(dbDriverData);
      // });

      res.json(dbDriverData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to update one specific driver by ID
router.put("/:id", (req, res) => {
  Driver.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      relation: req.body.relation,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbDriverData) => {
      if (!dbDriverData) {
        res.status(404).json({
          message: "No driver found with this id!",
        });
        return;
      }
      res.json(dbDriverData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to delete one specific owner by ID
router.delete("/:id", (req, res) => {
  Driver.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDriverData) => {
      if (!dbDriverData) {
        res.status(404).json({
          message: "No driver found with this id!",
        });
        return;
      }
      res.json(dbDriverData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
