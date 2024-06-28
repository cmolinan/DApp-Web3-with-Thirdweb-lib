
const  userModel = require('../models/userModelPostgres');

const { hashSync, genSaltSync, compareSync } = require("bcrypt");

module.exports = {

  getUserByEmail: async (req, res) => {
    const body = req.body;
    try {      
      const results = await userModel.getUserByEmail(body.email.toLowerCase())

      if ( results !== undefined && results !== null ) {
        return res.status(400).json(
          { 
            success: 0,
            message: "El email " + (res.req.body.email || '') + " ya existe" 
          });
      }
    } catch (err) {      
      return res.status(500).json({
        success: 0,
        message: "Internal error. "+ (err?.sqlMessage || err?.message || '') 
      })
    }
  }
}
