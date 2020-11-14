const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Owner, Auto, Driver } = require("../../models");
const multer = require("multer");
const upload = require("../../public/javascript/image-upload");
//this allows us to use a PUT method from HTML route, since html only
//supports POST and GET. This will change the post to a PUT
var methodOverride = require("method-override");
// override a POST having ?_method=PUT
router.use(methodOverride("_method"));
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
router.post("/", upload.single("image"), (req, res) => {
  Driver.create({
    owner_id: req.session.owner_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    relation: req.body.relation,
    image_url: req.file.location,
  })
    .then((dbDriverData) => {

      req.session.save(() => {
        req.session.driver = dbDriverData.id;
        req.session.loggedIn = true;

        res.redirect("/driver");

      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////
// Route to update one specific driver by ID
router.put("/:id", withAuth, (req, res) => {
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
router.delete("/:id", withAuth, (req, res) => {
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
      res.redirect("/driver");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
