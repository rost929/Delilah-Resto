const express = require("express");
const router = express.Router();
const aut = require("../jwt/authentication.js");
const service = require("../services/user-services.js");

// Creation of new user
router.post("/newUser", async (req, res) => {
  try {
    await service.createNewUser(
      req.body.username,
      req.body.password,
      req.body.phone,
      req.body.address,
      req.body.mail
    );
    res.status(201).send("User was created successfully");
  } catch {
    res.status(400).send("Error creating new user");
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const userFound = await service.searchUser(
      req.body.username,
      req.body.password
    );
    if (userFound !== null) {
      const result = await aut.generateToken(userFound.dataValues);
      if (result.error === true) res.status(400).send("Error authenticating");
      res.setHeader("content-type", "application/json");
      res.status(201).json({
        token: result.token,
        message: "User authenticated",
      });
    }
    res.status(401).send("User does not exist, check your credentials");
  } catch (error) {
    res.status(400).send("Bad Request, check your credentials");
  }
});

// Get all users
router.get("/users", aut.verifyTokenHeader, async (req, res) => {
  try {
    const tokenResult = await aut.validateToken(req.token);
    console.log("tokenResult ", tokenResult.validToken);
    if (tokenResult.validToken === true) {
      const users = await service.findAllUsers();
      res.setHeader("content-type", "application/json");
      return res.status(200).send(users);
    }
    res.status(403).json({
      message: tokenResult.message,
    });
  } catch (error) {
    res.status(403).send("Invalid Token");
  }
});

router.get("/userById/:userId", async (req, res) => {
  try {
    const userFound = await service.findUserById(req.params.userId);
    if (!userFound) res.status(404).send("The user could not be found");
    res.status(200).send(userFound);
  } catch (error) {
    res.status(400).send("Bad request");
  }
});

router.get("/user/:username", aut.verifyTokenHeader, async (req, res) => {
  try {
    const tokenResult = await aut.validateToken(req.token);
    if (tokenResult.validToken === true) {
      const userFound = await service.findUserByUsername(req.params.username);
      if (!userFound) res.status(404).send("The user could not be found");
      res.status(200).send(userFound);
    }
  } catch (error) {
    res.status(403).send("Token Invalid");
  }
});

module.exports = router;
