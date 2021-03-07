const state = require("../Database/state.js");
const { Op, where } = require("sequelize");


const addNewState = async (stateName) => {
    try {
        return await state.create({
          state: stateName,
        });
      } catch (error) {
          return error;
      }
}

const validateStateSent = (req,res,next) => {
    if (!req.body.state || typeof(req.body.state) === null) {
        return res.status(400).send("State did not supplied");
    }
    next();
}

module.exports = {
    addNewState,
    validateStateSent
}