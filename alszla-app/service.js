const url = require('url')
const getDbConnection = require('./mysql')
const DB_CONNECTION_REFUSED = 'ECONNREFUSED'
const STATUS_MESSAGE = {
  BAD_REQUEST: 'Bad Request',
  INVALID_REQUEST: 'Invalid Request'
}
const NEW_LINE = '\n'

exports.invalidRequest = function(request, response) {
  response.statusCode = 404
  response.setHeader('Content-Type', 'application/json')
  response.end(STATUS_MESSAGE.INVALID_REQUEST.concat(NEW_LINE))
}

exports.getUsers = function (request, response) {
  const db = getDbConnection()
  db.promise().query('SELECT * FROM `users`')
    .then( ([rows]) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(JSON.stringify(rows, undefined, 2).concat(NEW_LINE))
        } catch (error) {
          reject(error)
        }
      })
    })
    .then(prettyResponse => {
      db.end()
      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json')
      response.end(prettyResponse)
    })
    .catch(error => {
      (error.code !== DB_CONNECTION_REFUSED) ? db.end() : db.destroy()
      console.error(error)
      response.statusCode = 400
      response.setHeader('Content-Type', 'text/plain')
      response.end(STATUS_MESSAGE.BAD_REQUEST.concat(NEW_LINE))
    })
}
