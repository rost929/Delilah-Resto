"use-strict";
const sequelize =  require("./db.js")
const {DataTypes } = require("sequelize");

const product = sequelize.define("Product", {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING(30),
    allowNull: false
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
//console.log(product === sequelize.models.Product); // true

module.exports = product;