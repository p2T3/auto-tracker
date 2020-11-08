const { Owner } = require("../models");

const ownerData = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "test@test.com",
    password: "test1",
  },
];

const seedUsers = () => Owner.bulkCreate(ownerData);

module.exports = seedUsers;
