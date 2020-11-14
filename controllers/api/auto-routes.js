const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Owner, Auto, Driver } = require("../../models");
const { response } = require("express");
const multer = require("multer");
const upload = require("../../public/javascript/image-upload");
//this allows us to use a PUT method from HTML route, since html only
//supports POST and GET. This will change the post to a PUT
var methodOverride = require("method-override");
// override a POST having ?_method=PUT
router.use(methodOverride("_method"));
////////////////////////////////////////////////////////////////////////////////////////////////
// Route to get all vehicles
router.get("/", (req, res) => {
  Auto.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Owner,
        attributes: ["id", "first_name", "last_name", "email"],
      },
      {
        model: Driver,
        attributes: ["id", "first_name", "last_name", "relation"],
      },
    ],
  })
    .then((dbDriverData) => res.json(dbDriverData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////
// Route to get one specific vehicle by ID
router.get("/:id", (req, res) => {
  Auto.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Owner,
        attributes: ["id", "first_name", "last_name", "email"],
      },
      {
        model: Driver,
        attributes: ["id", "first_name", "last_name", "relation"],
      },
    ],
  })
    .then((dbAutoData) => {
      if (!dbAutoData) {
        res.status(404).json({
          message: "No auto found with this id!",
        });
        return;
      }
      res.json(dbAutoData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////
//Route to create a vehicle
router.post("/", upload.single("image"), withAuth, (req, res) => {
  Auto.create({
    owner_id: req.session.owner_id,
    driver_id: req.body.driver,
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    year: req.body.year,
    mileage: req.body["purchase-mileage"],
    vin: req.body.vin,
    license_plate: req.body["license-plate"],
    toll_tag: req.body["tolltag-number"],
    registration_expiration: req.body["registration-expiration"],
    insurance_expiration: req.body["insurance-expiration"],
    oil_mileage: req.body["oil-change-mileage"],
    tire_mileage: req.body["tire-change-mileage"],
    image_url: req.file.location,
  })
    .then((dbAutoData) => {
      req.session.save(() => {
        req.session.id = dbAutoData.id;
        req.session.loggedIn = true;

        res.redirect("/vehicle");
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////
// Route to update one specific owner by ID
router.put("/:id", withAuth, (req, res) => {
  Auto.update(
    {
      owner_id: req.session.owner_id,
      driver_id: req.body.driver_id,
      make: req.body.make,
      model: req.body.model,
      color: req.body.color,
      year: req.body.year,
      mileage: req.body["purchase-mileage"],
      vin: req.body.vin,
      license_plate: req.body["license-plate"],
      toll_tag: req.body["tolltag-number"],
      registration_expiration: req.body["registration-expiration"],
      insurance_expiration: req.body["insurance-expiration"],
      oil_mileage: req.body["oil-change-mileage"],
      tire_mileage: req.body["tire-change-mileage"],
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbAutoData) => {
      if (!dbAutoData) {
        res.status(404).json({
          message: "No auto found with this id!",
        });
        return;
      }
      res.redirect("/vehicle");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////
// Route to delete one specific owner by ID
router.delete("/:id", withAuth, (req, res) => {
  Auto.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbAutoData) => {
      if (!dbAutoData) {
        res.status(404).json({
          message: "No auto found with this id!",
        });
        return;
      }
      res.redirect("/vehicle");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
