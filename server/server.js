require("dotenv").config();
require("express-async-errors");

const express = require("express");
const { default: next } = require("next");
const debug = require("debug")("startup");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();

    require("./start/routes")(server);
    require("./database/database");

    const PORT = process.env.PORT || 5000;

    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(PORT, () =>
      debug(`server is running on ${PORT} in ${process.env.NODE_ENV}`)
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
