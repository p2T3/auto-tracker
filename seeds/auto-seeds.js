const { Auto } = require("../models");

const autoData = [
  {
    id: 1,
    make: "Volkswagen",
    model: "CC",
    color: "Grey",
    year: 2012,
    mileage: 33000,
    vin: "WVWNP7AN9CE533802",
    license_plate: "BCX1364",
    toll_tag: "HCTRA05689841",
    registration_expiration: "2021-06-01",
    insurance_expiration: "2021-02-03",
    oil_mileage: 33000,
    tire_mileage: 34000,
    image_url: "https://auto-tracker-bucket.s3.us-east-2.amazonaws.com/1605284353030",
    owner_id: 1,
    driver_id: 4,
  },
  {
    id: 2,
    make: "Audi",
    model: "A5",
    color: "White",
    year: 2012,
    mileage: 80,
    vin: "WAURFAFR2CA003155",
    license_plate: "CRP6302",
    toll_tag: "HCTRA05689451",
    registration_expiration: "2021-06-01",
    insurance_expiration: "2021-02-03",
    oil_mileage: 10000,
    tire_mileage: 34000,
    image_url: "https://auto-tracker-bucket.s3.us-east-2.amazonaws.com/1605284381502",
    owner_id: 1,
    driver_id: 3,
  },
  {
    id: 3,
    make: "Honda",
    model: "Civic",
    color: "Silver",
    year: 2019,
    mileage: 330,
    vin: "WDBSK79F17F127395",
    license_plate: "CRP6302",
    toll_tag: "HCTRA05689451",
    registration_expiration: "2021-06-01",
    insurance_expiration: "2021-02-03",
    oil_mileage: 33000,
    tire_mileage: 34000,
    image_url: "https://auto-tracker-bucket.s3.us-east-2.amazonaws.com/1605285732072",
    owner_id: 1,
    driver_id: 2,
  },
  {
    id: 4,
    make: "GMC",
    model: "Yukon",
    color: "dark gray",
    year: 2017,
    mileage: 25500,
    vin: "1GKS1GKC9GR401708",
    license_plate: "LYD0892",
    toll_tag: "HCTRA045689841",
    registration_expiration: "2021-06-01",
    insurance_expiration: "2021-02-03",
    oil_mileage: 33000,
    tire_mileage: 34000,
    image_url: "https://auto-tracker-bucket.s3.us-east-2.amazonaws.com/1605284337800",
    owner_id: 1,
    driver_id: 1,
  },
];

const seedPosts = () => Auto.bulkCreate(autoData);

module.exports = seedPosts;
