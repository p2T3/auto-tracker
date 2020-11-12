const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const imageRoutes = require("./image-upload");

router.use("/api", apiRoutes);
router.use("/", dashboardRoutes);
router.use("/", homeRoutes);
router.use("/", imageRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
