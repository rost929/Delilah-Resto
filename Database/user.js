"use-strict";
const sequelize =  require("./db.js");
const {DataTypes } = require("sequelize");
const order = require("./order.js")

const user = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(24),
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

user.hasMany(order, { foreignKey: "orderId" });
order.belongsTo(user, { foreignKey: 'orderId' });

user.sync();

module.exports = user;