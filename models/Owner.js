const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt    = require( 'bcrypt' );

class Owner extends Model {
  // Set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
  };
}

// Define the data for the 'owner/user' table.
Owner.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
      // Add the 'hooks' section, needed for password hashing with bcrypt
      hooks: {
  
        // This ability is needed when a new user signs up.
        // Set up 'beforeCreate' lifecycle "hook" functionality
        // This second variation uses 'async/await'
        async beforeCreate(newOwnerData) {
          newOwnerData.password = await bcrypt.hash(newOwnerData.password, 10);
          return newUserData;
        },
  
        // This ability is needed when a user updates his/her password.
        // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updatedOwnerData) {
          updatedOwnerData.password = await bcrypt.hash(updatedOwnerData.password, 10);
          return updatedOwnerData;
        }
      },
    },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "owner",
  }
);

module.exports = Owner;
