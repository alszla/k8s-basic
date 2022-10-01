const config = require('./config')
const mysql = require('mysql2')

const { DB_HOST, DB_PORT, DB_SCHEMA, DB_USER, DB_PASSWORD } = config

module.exports = function () {
  return mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_SCHEMA,
    port: DB_PORT
  })
}
