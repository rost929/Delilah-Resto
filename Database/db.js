const { Sequelize } = require("sequelize");
const { db } = require("../utils/config.js");

require("dotenv").config();

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
});

sequelize
  .authenticate()
  .then(() => console.log("Connection to database successful"))
  .catch(() => console.log("Error connecting to the database"));

module.exports = sequelize;
