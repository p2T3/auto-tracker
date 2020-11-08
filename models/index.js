const Auto = require("./Auto");
const Owner = require("./Owner");
const Driver = require("./Driver");

Auto.belongsTo(Owner, {
  foreignKey: "owner_id", // a vehicle has one owner
});

Auto.belongsTo(Driver, {
  foreignKey: "driver_id", // a vehicle has one primary driver
});

Owner.hasMany(Auto, {
  foreignKey: "owner_id", // an owner can own many vehicles
});

Driver.hasMany(Auto, {
  foreignKey: "driver_id", // a person can be the primary driver of many vehicles
});

module.exports = { Auto, Owner, Driver };
