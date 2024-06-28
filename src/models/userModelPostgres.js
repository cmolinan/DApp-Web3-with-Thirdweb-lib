// require('dotenv').config();
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
  getUserByEmail: (email) => {

    return new Promise((resolve, reject) => {
       //now accepts username instead of email
      // let  query = `select * from "users" where email='${email}'`      
      // if (!email.includes("@")) query = `select * from "users" where username='${email}'`
      let  query = 'select * from "users" where email=$1'
      if (!email.includes("@")) query = 'select * from "users" where username=$1'
      
      connection.query(
        query,
        [email],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          if (results.rows.length > 0) {
            return resolve(results.rows[0]);
          } else {
            return resolve(null);
          }
        }
      );
    });
  },

  createUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO users(name, email, password, phone, username) 
                  values($1,$2,$3,$4,$5) returning *`,
        [
          data.name,
          data.email.toLowerCase(),
          data.password,
          data.phone,
          data.username.toLowerCase()
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

  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id, name, email, username, phone FROM users',
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
