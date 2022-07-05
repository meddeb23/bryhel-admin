require("dotenv").config();
require("express-async-errors");

const express = require("express");
const debug = require("debug")("startup");
const app = express();

require("./start/routes")(app);
require("./database/database");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  debug(`server is running on ${PORT} in ${process.env.NODE_ENV}`)
);
