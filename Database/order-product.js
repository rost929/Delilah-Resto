"use-strict";
const sequelize =  require("./db.js");
const {DataTypes } = require("sequelize");
const order = require("./order.js")
const product = require("./product.js");

const order_product = sequelize.define("order_product", {
  idOrderProduct: {
    type: DataTypes.UUID,
    primaryKey: true
  }
});

order.belongsToMany(product, { through: 'order_product', foreignKey: 'orderId' });
product.belongsToMany(order, { through: 'order_product', foreignKey: 'productId' });

module.exports = order_product;