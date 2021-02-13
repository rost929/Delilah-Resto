"use-strict";
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("../Database/db");
const user  = require("./user.js");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () =>
  console.log("Server is running " + process.env.PORT)
);
