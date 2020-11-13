const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Owner, Auto, Driver } = require("../../models");
const { response } = require("express");
const multer = require("multer");
const upload = require("../../public/javascript/image-upload");

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
// Route to add an image to AWS S3 and get url back
router.post("/", upload.single("image"), (req, res) => {
  console.log("Add image Route", req.body);
    console.log("REQ", req.body );
    console.log("Uploaded!");
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

          res.redirect('/vehicle');
          
        });
      })

      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  // });
}); 

////////////////////////////////////////////////////////////////////////////////////////////////
// Route to update one specific owner by ID
router.put("/:id", (req, res) => {
  Auto.update(
    {
      owner_id: req.session.owner_id,
      driver_id: req.body.driver_id,
      make: req.body.make,
      model: req.body.model,
      color: req.body.color,
      year: req.body.year,
      mileage: req.body.mileage,
      vin: req.body.vin,
      license_plate: req.body.license_plate,
      toll_tag: req.body.toll_tag,
      registration_expiration: req.body.registration_expiration,
      insurance_expiration: req.body.insurance_expiration,
      oil_mileage: req.body.oil_mileage,
      tire_mileage: req.body.tire_mileage,
      image_url: req.body.image_url,
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
      res.json(dbAutoData);
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
      res.json(dbAutoData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
