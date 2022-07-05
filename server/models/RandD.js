const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const RandD = sequelize.define("RandD", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  language: {
    type: Sequelize.ENUM("fr", "en"),
    defaultValue: "en",
  },
});

module.exports = RandD;
