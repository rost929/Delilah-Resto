"use-strict";
const sequelize =  require("../Database/db.js")
const { Sequelize, DataTypes } = require("sequelize");


const user = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

// `sequelize.define` also returns the model
console.log(user === sequelize.models.User); // true

user.sync();


module.exports = user;