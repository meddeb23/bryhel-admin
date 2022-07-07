const express = require("express");
const { errorHandler } = require("../middlewares/errorHandler");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

module.exports = (app) => {
  app.use("/static", express.static(path.join(__dirname, "..", "public")));
  if (process.env.NODE_ENV !== "developement")
    app.use(
      "/",
      express.static(path.join(__dirname, "..", "..", "client", "build"))
    );
  app.use(express.json());
  app.use(cookieParser());
  app.use(fileupload());
  app.use(morgan("tiny"));
  // app.use(helmet());

  app.use("/api/v1/page", require("../routes/api/pages"));
  app.use("/api/v1/user", require("../routes/api/user"));

  app.use(errorHandler);
};
