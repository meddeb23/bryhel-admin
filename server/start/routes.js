const express = require("express");
const { errorHandler } = require("../middlewares/errorHandler");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

module.exports = (app) => {
  app.use("/static", express.static(path.join(__dirname, "..", "public")));
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(helmet());

  app.use("/api/v1/page", require("../routes/api/pages"));

  app.use(errorHandler);
};
