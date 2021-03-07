const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(user, process.env.KEY, { expiresIn: "30h" }, (error, token) => {
      if (error) reject({ token: null, error: true });
      resolve({ token: token, error: false });
    });
  });
};

const validateToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.KEY, (error, data) => {
      if (error)  reject({ validToken: false, message: "token invalid" }); 
      resolve({ validToken: true, message: "Token valid", user: data });
    });
  });
};

// Verifies if token exists and if it is active
function verifyTokenHeader(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (
    typeof bearerHeader !== "undefined" &&
    bearerHeader.split(" ").length > 1
  ) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    return next();
  }
  res.status(403).send("Access denied");
}

module.exports = { generateToken, verifyTokenHeader, validateToken };
