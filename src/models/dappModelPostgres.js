const Pool = require('pg').Pool

const connection = new Pool({
  host: process.env.PG_DATABASE_HOST,
  user: process.env.PG_DATABASE_USER,
  password: process.env.PG_DATABASE_PASSWORD,
  database: process.env.PG_DATABASE_NAME,
  port: process.env.PG_DATABASE_PORT,        
  ssl: true
})

module.exports = {

  getTransactions: (mode) => {
    
    let query = ''
    if (mode == 'transfers') query = 'SELECT  transfers.id,  users.name as username, \
      chains.name as chain, tokens.name as token,  from_address, to_address, amount, hash \
      FROM  transfers \
      JOIN users ON transfers.user_id = users.id \
      JOIN chains ON transfers.chain_id = chains.id \
      JOIN tokens ON transfers.token_id = tokens.id'
    
    if (mode == 'swaps') query = 'SELECT  swaps.id,  users.name as username, \
      chains.name as chain,  tokensF.name as from_token,  \
      tokensT.name as to_token,  from_amount,  to_amount, hash \
      FROM  swaps \
      JOIN users ON swaps.user_id = users.id \
      JOIN chains ON swaps.chain_id = chains.id \
      JOIN tokens as tokensF ON swaps.from_token_id = tokensF.id \
      JOIN tokens as tokensT ON swaps.to_token_id = tokensT.id'
  
    return new Promise((resolve, reject) => {      
      connection.query(query,
        (error, results) => {
          if (error) {
            return reject(error);
          } else {
            results = results.rows
            return  resolve(results);
          }
        }
      )
    })
  },

}
