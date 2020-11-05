const router = require('express').Router();
const { Owner, Auto, Driver } = require('../../models');


router.get('/', (req, res) => {
    Auto.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [{
                model: Owner,
                attributes: ['id', 'first_name', 'last_name', 'email']
            }, {
                model: Driver,
                attributes: ['id', 'first_name', 'last_name', 'relation']
            }]
        })
        .then((dbDriverData) => res.json(dbDriverData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Auto.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            where: {
                id: req.params.id
            },
            include: [{
                model: Owner,
                attributes: ['id', 'first_name', 'last_name', 'email']
            }, {
                model: Driver,
                attributes: ['id', 'first_name', 'last_name', 'relation']
            }]
        })
        .then(dbAutoData => {
            if (!dbAutoData) {
                res.status(404).json({
                    message: 'No auto found with this id!'
                });
                return;
            }
            res.json(dbAutoData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Auto.create({
            owner_id: req.body.owner_id,
            driver_id: req.body.driver_id,
            make: req.body.make,
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            mileage: req.body.mileage,
            vin: req.body.vin,
            license_plate: req.body.license_plate,
            registration_expiration: req.body.registration_expiration,
            insurance_expiration: req.body.insurance_expiration,
            oil_mileage: req.body.oil_mileage,
            tire_mileage: req.body.tire_mileage
        })
        .then(dbAutoData => {
            // Commented out below for now until we set up a session login.

            // req.session.save(() => {
            //     req.session.user_id = dbDriverData.id;
            //     req.session.username = dbDriverData.username;
            //     req.session.loggedIn = true;

            //     res.json(dbAutoData);
            // });

            res.json(dbAutoData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.put('/:id', (req, res) => {
    Auto.update({
            owner_id: req.body.owner_id,
            driver_id: req.body.driver_id,
            make: req.body.make,
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            mileage: req.body.mileage,
            vin: req.body.vin,
            license_plate: req.body.license_plate,
            registration_expiration: req.body.registration_expiration,
            insurance_expiration: req.body.insurance_expiration,
            oil_mileage: req.body.oil_mileage,
            tire_mileage: req.body.tire_mileage
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbAutoData => {
            if (!dbAutoData) {
                res.status(404).json({
                    message: 'No auto found with this id!'
                });
                return;
            }
            res.json(dbAutoData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.delete("/:id", (req, res) => {
    Auto.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbAutoData) => {
            if (!dbAutoData) {
                res.status(404).json({
                    message: "No auto found with this id!"
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