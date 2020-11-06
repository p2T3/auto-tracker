const router = require("express").Router();

const ownerRoutes = require("./owner-routes");
const autoRoutes = require("./auto-routes");
const driverRoutes = require("./driver-routes");

router.use("/owners", ownerRoutes);
router.use("/autos", autoRoutes);
router.use("/drivers", driverRoutes);

module.exports = router;
