require("dotenv").config();
require("express-async-errors");

const express = require("express");
const debug = require("debug")("startup");

const dev = process.env.NODE_ENV !== "production";
const server = express();

require("./start/routes")(server);
require("./database/database");



const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  debug(`server is running on ${PORT} in ${process.env.NODE_ENV}`)
);