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

//////////////////////////////////////////////////////////////////////////////////////////////////
// This is the login route
router.post("/login", (req, res) => {
  console.log("In login route");
  console.log("req.body", req.body);
  // Query operation to validate a user
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  Owner.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbOwnerData) => {
    console.log("In owner.findOne.", dbOwnerData);
    if (!dbOwnerData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    // Verify user by comparing passwords.  The database hashed password will be
    // in 'dbUserData', while the plaintext (user entered) password will be in req.body.
    const validPassword = dbOwnerData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    // req.session.save(() => {
    //   // declare session variables
    //   req.session.user_id = dbUserData.id;
    //   req.session.username = dbUserData.username;
    //   req.session.loggedIn = true;

    res.json({ owner: dbOwnerData, message: "You are now logged in!" });
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
