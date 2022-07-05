const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  language: {
    type: Sequelize.ENUM("fr", "en"),
    defaultValue: "en",
  },
});

module.exports = Project;
