
const dappModel = require('../models/dappModelPostgres');

module.exports = {

  getTransactions: async (req, res, mode) => {
    
    try {
      const results = await dappModel.getTransactions(mode)
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
  },

  saveTransaction: async (req, res, mode) => {    
    const body = req.body;
    let results = undefined

    try {
      if (mode == 'transfer')  {
        results = await dappModel.saveTransfer(body)
      } else if (mode == 'swap')  {
        results = await dappModel.saveSwap(body)
      } else throw new Error(`Invalid ${mode}`);
  
      if (!results.insertId) {
        return res.json({
          success: 0,
          message: "No se pudo grabar"
        });
      }
        
      return res.json({
        success: 1,        
      });

    } catch (err) {
      return res.status(500).json({
        success: 0,        
        message: "Internal error. "+ (err.sqlMessage || err.message || '')
      });
    }
  },
}
