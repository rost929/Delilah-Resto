"use-strict";
//import { v4 as uuidv4 } from 'uuid';
const uuid = require("uuid");
const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");
const order = require("./order.js");

const user = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
});

user.beforeCreate((user, _) => {
  return (user.userId = uuid.v4());
});

user.hasMany(order, { foreignKey: "orderId" });
order.belongsTo(user, { foreignKey: "orderId" });

module.exports = user;
