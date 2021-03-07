const product = require("../Database/product.js");
const { Op, where } = require("sequelize");

async function findAllProducts() {
  try {
    return await product.findAll({ atrributes: ["name"] });
  } catch (error) {
    return error;
  }
}

const createNewProduct = async (name, price, description) => {
  try {
    return await product.create({
      name: name,
      price: price,
      description: description,
    });
  } catch (error) {
      return error;
  }
};

const deleteProduct = async (idProduct) => {
    return await product.destroy({
        where: { 
            productId: idProduct
        }
    });
}

const changePriceProduct = async (idProduct, price) => {
    return await product.update({
        price: price} ,{
            where:{
            productId: idProduct
        }
    });
}

const validatePrice = async (req, res, next) => {
    if(!req.body.price) res.status(400).send("New price did not supplied");
    if(isNaN(req.body.price) || req.body.price <= 0)  res.status(400).send("Invalid price, supply a valid price");
    return next();
}

module.exports = {
  findAllProducts,
  createNewProduct,
  deleteProduct, 
  changePriceProduct,
  validatePrice
};
