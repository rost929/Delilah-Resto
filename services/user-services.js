const user = require("../Database/user.js");
const { Op } = require("sequelize");
const encrypt = require("../utils/encrypt.js");

const searchUser = async (username, password) => {
  return await user.findOne({
    where: {
      [Op.and]: [
        { username: username },
        { password: encrypt.sha256(password) },
      ],
    },
  });
};

const createNewUser = async (username, password, phone, address, mail) => {
  return await user.create({
    username: username,
    password: encrypt.sha256(password),
    phone: phone,
    address: address,
    mail: mail,
  });
};

async function findAllUsers() {
  try {
    return await user.findAll({ atrributes: ["username"] });
  } catch (error) {
    return error;
  }
}

async function findUserById(userId) {
  return await user.findByPk(userId);
}

async function findUserByUsername(username) {
  return await user.findOne({
    where: { username: username },
  });
}

module.exports = {
  searchUser,
  createNewUser,
  findAllUsers,
  findUserById,
  findUserByUsername,
};
