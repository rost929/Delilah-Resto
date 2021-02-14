"use-strict";
const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");

const order = sequelize.define("Order", {
  orderId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  orderTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});



order.sync({ force: true });

module.exports = order;
