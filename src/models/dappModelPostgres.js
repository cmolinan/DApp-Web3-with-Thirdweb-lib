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

  saveTransfer: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO transfers(        
        chain_id, token_id, from_address, to_address, amount, user_id, hash) values($1,$2,$3,$4,$5,$6,$7) returning *`,
        [
          data.chainId,
          data.tokenId,
          data.from,
          data.to,
          data.amount,
          data.userId,
          data.hash
        ],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          results.insertId = results.rows[0].id
          return resolve(results);
        }
      )
    })
  },

  saveSwap: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO swaps(
        chain_id, address, from_token_id, to_token_id, amount, user_id, hash) values($1,$2,$3,$4,$5,$6,$7) returning *`,
        [
          data.chainId,
          data.address,
          data.fromTokenId,
          data.toTokenId,
          data.amount,          
          data.userId,
          data.hash
        ],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          results.insertId = results.rows[0].id
          return resolve(results);
        }
      )
    })
  },

  getTransactions: (mode) => {
    
    let query = ''
    if (mode == 'transfers') {
      query = 'SELECT  transfers.id,  users.name as username, \
      chains.name as chain, tokens.name as token,  from_address, to_address, amount, hash, timestamp as date \
      FROM  transfers \
      JOIN users ON transfers.user_id = users.id \
      JOIN chains ON transfers.chain_id = chains.id \
      JOIN tokens ON transfers.token_id = tokens.id'

    } else if (mode == 'swaps') {
      query = 'SELECT  swaps.id,  users.name as username, \
      chains.name as chain,  tokensF.name as from_token, address, \
      tokensT.name as to_token,  amount, hash, timestamp as date \
      FROM  swaps \
      JOIN users ON swaps.user_id = users.id \
      JOIN chains ON swaps.chain_id = chains.id \
      JOIN tokens as tokensF ON swaps.from_token_id = tokensF.id \
      JOIN tokens as tokensT ON swaps.to_token_id = tokensT.id'
    } else throw new Error(`Invalid ${mode}`);
  
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
