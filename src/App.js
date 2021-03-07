"use-strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("../Database/db");
require("../Database/user.js");
require("../Database/product.js");
require("../Database/favourite.js");
require("../Database/order.js");
require("../Database/state.js");
require("../Database/order-product.js");
require("dotenv").config();

const clientEndpoints = require("../routes/user-controller.js");
const productEndpoints = require("../routes/product-controller.js");
const stateEndpoints = require("../routes/state-controller.js");

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/", clientEndpoints);
app.use("/api/v1/", productEndpoints);
app.use("/api/v1/", stateEndpoints);

app.listen(process.env.PORT, () =>
  console.log("Server is running " + process.env.PORT)
);
