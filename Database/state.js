"use-strict";
const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");
const order = require("./order.js");

const state = sequelize.define("State", {
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  state: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
});

state.hasMany(order, { foreignKey: "orderId" });
order.belongsTo(state, { foreignKey: "orderId" });

module.exports = state;
