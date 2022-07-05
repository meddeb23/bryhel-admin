const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const FAQ = sequelize.define("FAQ", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  answer: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  language: {
    type: Sequelize.ENUM("fr", "en"),
    defaultValue: "en",
  },
});

module.exports = FAQ;
