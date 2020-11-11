const { Owner } = require("../models");
const bcrypt = require("bcrypt");


const ownerData = 
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "test@test.com",
    password: "test1"
  }

const seedUsers = () => Owner.create(ownerData);

module.exports = seedUsers;
