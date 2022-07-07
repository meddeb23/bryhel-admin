const debug = require("debug")("startup");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

sequelize.authenticate().then((err) => {
  if (err) debug("Unable to connect to the database:", error);
  else debug("Connection has been established successfully.");
});

module.exports = sequelize;
