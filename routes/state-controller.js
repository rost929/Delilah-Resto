const express = require("express");
const router = express.Router();
const aut = require("../jwt/authentication.js");
const service = require("../services/state-service.js");

router.post("/state", aut.verifyTokenHeader, service.validateStateSent, async (req, res) => {
  try {
    const tokenResult = await aut.validateToken(req.token);
    if (tokenResult.validToken === true) {
      const result = await service.addNewState(req.body.state);
      console.log(result);
      return res.status(201).send("Type order state created successfully");
    }
    res.status(403).json({
      message: tokenResult.message,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating new type order state", error: error });
  }
});

module.exports = router;
