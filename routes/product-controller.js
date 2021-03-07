const express = require("express");
const router = express.Router();
const aut = require("../jwt/authentication.js");
const service = require("../services/product-service.js");

router.post("/product", aut.verifyTokenHeader, async (req, res) => {
  try {
    const tokenResult = await aut.validateToken(req.token);
    if (tokenResult.validToken === true) {
      await service.createNewProduct(
        req.body.name,
        req.body.price,
        req.body.description
      );
      res.status(201).send("Product was created successfully");
    }
    res.status(403).json({
      message: tokenResult.message,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating new product", error: error });
  }
});

router.get("/products", aut.verifyTokenHeader, async (req, res) => {
  try {
    const products = await service.findAllProducts();
    res.setHeader("content-type", "application/json");
    return res.status(200).send(products);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting the products", error: error });
  }
});

router.put("/product/:idProduct", aut.verifyTokenHeader, service.validatePrice , async (req, res) => {
  try {
    const tokenResult = await aut.validateToken(req.token);
    if (tokenResult.validToken === true) {
      const result = await service.changePriceProduct(req.params.idProduct, req.body.price);
      console.log(result);
      if( result[0] !== 0){
        res.setHeader("content-type", "application/json");
        return res.status(200).send("Price product changed successfully");
      }
      return res.status(404).send("Product specified does not exist");
    }
    res.status(403).json({
      message: tokenResult.message,
    });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product", error: error });
  }
});

router.delete(
  "/product/:idProduct",
  aut.verifyTokenHeader,
  async (req, res) => {
    try {
      const tokenResult = await aut.validateToken(req.token);
      if (tokenResult.validToken === true) {
        await service.deleteProduct(req.params.idProduct);
        res.setHeader("content-type", "application/json");
        return res.status(200).send("Product deleted successfully");
      }
      res.status(403).json({
        message: tokenResult.message,
      });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error: error });
    }
  }
);

module.exports = router;
