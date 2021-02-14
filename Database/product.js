"use-strict";
const sequelize =  require("./db.js")
const {DataTypes } = require("sequelize");

const product = sequelize.define("Product", {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.DOUBLE(),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
});

// `sequelize.define` also returns the model
console.log(product === sequelize.models.Product); // true



product.sync();

module.exports = product;