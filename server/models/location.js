const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const Location = sequelize.define("location", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  language: {
    type: Sequelize.ENUM("fr", "en"),
    defaultValue: "en",
  },
});

module.exports = Location;
