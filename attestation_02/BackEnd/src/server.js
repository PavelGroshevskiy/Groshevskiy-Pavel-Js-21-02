const express = require("express");
const { host, port } = require("../config/serverConfig");
const router = require("./routes/index");
const logger = require("./logger");
const context = require("request-context");
const multer = require("multer");
const { v4: generateUUID } = require("uuid");

const app = express();

app.use(express.json({ extended: true }), multer().single("image"));

app.use(context.middleware("request"));
app.use((req, res, next) => {
  context.set("uuid", generateUUID());
  res
    .type("application/json")
    .set("Access-Control-Allow-Origin", "*")
    .set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    .set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  next();
});

app.use("/api", router);

app.use((err, req, res, next) => {
  console.log(err);
  logger.fatal(err);
  res.status(500).send(err.toString());
  next();
});

app.listen(port, host, () => console.log("App started"));
