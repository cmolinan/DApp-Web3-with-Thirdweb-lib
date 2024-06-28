
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
  },

  getAllUsers: async (req, res) => {
    try {
      const results = await userModel.getAllUsers()
      if (!results.length) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
        
      return res.json({
        success: 1,
        data: results
      });

    } catch (err) {
      return res.status(500).json({
        success: 0,        
        message: "Internal error. "+ (err.sqlMessage || err.message || '')
      });
    }
  }
}
