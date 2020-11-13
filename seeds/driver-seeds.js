const { Driver } = require("../models");

const driverData = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    relation: "Self",
    image_url:
      "https://auto-tracker-bucket.s3.us-east-2.amazonaws.com/1605293077734",
    owner_id: 1,
  },
  {
    id: 2,
    first_name: "Johnny",
    last_name: "Doe",
    relation: "Son",
    image_url:
      "https://auto-tracker-bucket.s3.us-east-2.amazonaws.com/1605293077734",
    owner_id: 1,
  },
  {
    id: 3,
    first_name: "Jane",
    last_name: "Doe",
    relation: "Daughter",
    image_url:
      "https://auto-tracker-bucket.s3.us-east-2.amazonaws.com/1605293069599",
    owner_id: 1,
  },
  {
    id: 4,
    first_name: "Jen",
    last_name: "Doe",
    relation: "Spouse",
    image_url:
      "https://auto-tracker-bucket.s3.us-east-2.amazonaws.com/1605293069599",
    owner_id: 1,
  },
];

const seedComments = () => Driver.bulkCreate(driverData);

module.exports = seedComments;
