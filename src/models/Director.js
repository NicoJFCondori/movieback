const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Director = sequelize.define("director", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Director;