const now = new Date();

const userModel = require('../models/userModelPostgres');

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
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

    try {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const results = await userModel.createUser(body) 

      body.password = undefined;
      body.id = results.insertId;

      return res.status(200).json({
        success: 1,
        message: "User created succesfully",          
        data: body
      }); 
    } catch (err) {      
      return res.status(500).json({
        success: 0,
        message: "Internal error. "+ (err?.sqlMessage || err?.message || '')
      })
    }
  },

  login: async (req, res) => {
    try {
      const body = req.body;
      const results = await userModel.getUserByEmail(body.email.toLowerCase());

      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email: " + (body.email || '') 
        });
      }

      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;

        // Calcular la fecha y hora exactas en las que el token expirará
        // const now = new Date();
        const expires = "12h"
        const expiresTimeinMinutes = 720
        
        const now = new Date();
        const expirationDate = new Date(now);
        expirationDate.setMinutes(now.getMinutes() + expiresTimeinMinutes);

        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {          
          expiresIn: expires
        });

        return res.json({
          success: 1,
          message: "Login successfully",
          id: results.id,
          name: results.name,
          email: results.email,
          phone: results.phone,
          token: jsontoken,
          expires: expirationDate.toLocaleString()
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  signout: async (req, res) => {
    res.json({ message: 'Successful session closing' });
  }
};
