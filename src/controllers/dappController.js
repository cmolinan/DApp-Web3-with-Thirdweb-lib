
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
}
