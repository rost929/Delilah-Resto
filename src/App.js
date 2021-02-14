"use-strict";
const express = require("express");
const bodyParser = require("body-parser");
require("../Database/db");
require("../Database/user.js");
require("../Database/product.js");
require("../Database/favourite.js");
require("../Database/order.js");
require("../Database/state.js");
require("../Database/order-product.js");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () =>
  console.log("Server is running " + process.env.PORT)
);
