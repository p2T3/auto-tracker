const seedOwner = require("./owner-seeds");
const seedAutos = require("./auto-seeds");
const seedDrivers = require("./driver-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedOwner();
  console.log("\n----- OWNER SEEDED -----\n");
  await seedDrivers();
  console.log("\n----- DRIVERS SEEDED -----\n");
  await seedAutos();
  console.log("\n----- AUTOS SEEDED -----\n");

  process.exit(0);
};

seedAll();
