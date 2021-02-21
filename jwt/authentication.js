const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (user) => {
  console.log("Ingrese hasta aquí");
  return new Promise((resolve, reject) => {
    jwt.sign(user, process.env.KEY, { expiresIn: "30h" }, (error, token) => {
      if (error) reject({ token: null, error: true });
      resolve({ token: token, error: false });
    });
  });
};

module.exports = { generateToken };
