"use-strict";
const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");
const user = require("../Database/user.js");
const product = require("../Database/product.js");

const favourite = sequelize.define("Favourite", {
  favouriteId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
});

favourite.belongsTo(user, { foreignKey: "userId" });
favourite.belongsTo(product, { foreignKey: "productId" });

favourite.sync();

// `sequelize.define` also returns the model
//console.log(product === sequelize.models.Product); // true

module.exports = favourite;
