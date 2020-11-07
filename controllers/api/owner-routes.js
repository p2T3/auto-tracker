const router = require("express").Router();
const { Owner, Auto, Driver } = require("../../models");


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to get all owners
router.get("/", (req, res) => {
  Owner.findAll({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  })
    .then((dbOwnerData) => res.json(dbOwnerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to get one specific owner by ID
router.get("/:id", (req, res) => {
  Owner.findOne({
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
    .then((dbOwnerData) => {
      if (!dbOwnerData) {
        res.status(404).json({
          message: "No owner found with this id",
        });
        return;
      }
      res.json(dbOwnerData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to create (add) an owner
router.post("/", (req, res) => {
  Owner.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbOwnerData) => {
      // Commented out below for now until we set up a session login.

      // req.session.save(() => {
      //     req.session.user_id = dbOwnerData.id;
      //     req.session.username = dbOwnerData.username;
      //     req.session.loggedIn = true;

      //     res.json(dbOwnerData);
      // });

      res.json(dbOwnerData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to update the data for one specific owner by ID
router.put("/:id", (req, res) => {
  Owner.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbOwnerData) => {
      if (!dbOwnerData) {
        res.status(404).json({
          message: "No owner found with this id!",
        });
        return;
      }
      res.json(dbOwnerData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
// Route to delete one specific owner by ID
router.delete("/:id", (req, res) => {
  Owner.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbOwnerData) => {
      if (!dbOwnerData) {
        res.status(404).json({
          message: "No owner found with this id!",
        });
        return;
      }
      res.json(dbOwnerData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
