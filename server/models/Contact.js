const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const Contact = sequelize.define("contact", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  language: {
    type: Sequelize.ENUM("fr", "en"),
    defaultValue: "en",
  },
});

module.exports = Contact;
