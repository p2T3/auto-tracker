const { Driver } = require("../models");

const driverData = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    relation: "Self",
  },
  {
    id: 2,
    first_name: "Johnny",
    last_name: "Doe",
    relation: "Son",
  },
  {
    id: 3,
    first_name: "Jane",
    last_name: "Doe",
    relation: "Daughter",
  },
];

const seedComments = () => Driver.bulkCreate(driverData);

module.exports = seedComments;
