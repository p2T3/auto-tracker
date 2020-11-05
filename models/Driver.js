const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Driver extends Model {}

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
    auto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "auto",
        key: "id",
      },
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
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
