const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Driver extends Model {}

// Define the data for the 'driver' table.  These tables specifies
// the drivers available to assign to specific cars.
Driver.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relation: {
      type: DataTypes.STRING, // defines how this driver is related to the owner/user
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "driver",
  }
);

module.exports = Driver;
