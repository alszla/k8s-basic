const url = require('url')
const getDbConnection = require('./mysql')
const DB_CONNECTION_REFUSED = 'ECONNREFUSED'
const STATUS_MESSAGE = {
  BAD_REQUEST: 'Bad Request',
  INVALID_REQUEST: 'Invalid Request',
  USER_DELETED: 'User has been deleted'
}
const NEW_LINE = '\n'

exports.invalidRequest = function(request, response) {
  response.statusCode = 404
  response.setHeader('Content-Type', 'application/json')
  response.end(STATUS_MESSAGE.INVALID_REQUEST.concat(NEW_LINE))
}

exports.getUsers = function (request, response) {
  getDbConnection().promise().query('SELECT * FROM `users`')
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
      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json')
      response.end(prettyResponse)
    },
      reason => {
        return Promise.reject(reason)
      })
    .catch(error => {
      console.error(error)
      response.statusCode = 400
      response.setHeader('Content-Type', 'text/plain')
      response.end(STATUS_MESSAGE.BAD_REQUEST.concat(NEW_LINE))
    })
}

exports.getUsersUserId = function (request, response) {
  const { url: requestUrl } = request
  const parsedUrl = url.parse(requestUrl, true)
  const userId = parsedUrl.query.id

  getDbConnection().promise().query(`SELECT * FROM \`users\` WHERE \`id\` = ${userId}`)
    .then( ([rows]) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(JSON.stringify(rows[0], undefined, 2).concat(NEW_LINE))
        } catch (error) {
          reject(error)
        }
      })
    })
    .then(prettyResponse => {
      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json')
      response.end(prettyResponse)
    },
      reason => {
        return Promise.reject(reason)
      })
    .catch(error => {
      console.error(error)
      response.statusCode = 400
      response.setHeader('Content-Type', 'text/plain')
      response.end(STATUS_MESSAGE.BAD_REQUEST.concat(NEW_LINE))
    })
}

exports.postUsers = function (request, response) {
  let body = ''

  request.on('data', chunk => {
      body += chunk
    })
  request.on('end', () => new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })
    .then(postBody => getDbConnection().promise().query(`INSERT INTO \`users\` (\`${Object.keys(postBody).join('`, `')}\`) VALUES ('${Object.values(postBody).join("', '")}')`),
      reason => {
        return Promise.reject(reason)
      })
    .then( ([rows]) => {
        return Promise.resolve(rows.insertId)
      },
      reason => {
        return Promise.reject(reason)
      })
    .then( id => getDbConnection().promise().query(`SELECT * FROM \`users\` WHERE \`id\` = ${id}`),
      reason => {
        return Promise.reject(reason)
      })
    .then( ([rows]) => {
        const prettyResponse = JSON.stringify(rows[0], undefined, 2).concat(NEW_LINE)
        response.statusCode = 201
        response.setHeader('Content-Type', 'application/json')
        response.end(prettyResponse)
      },
      reason => {
        return Promise.reject(reason)
      })
    .catch(error => {
      console.error(error)
      response.statusCode = 400
      response.setHeader('Content-Type', 'text/plain')
      response.end(STATUS_MESSAGE.BAD_REQUEST.concat(NEW_LINE))
    }))
  request.on('error', error => {
      console.error(error.stack)
    })
}

exports.putUsers = function (request, response) {
  const { url: requestUrl } = request
  const parsedUrl = url.parse(requestUrl, true)
  const userId = parsedUrl.query.id
  let body = ''

  request.on('data', chunk => {
      body += chunk
    })
  request.on('end', () => new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })
    .then(putBody => {
        queryString = `UPDATE \`users\` SET ${prepareStringsForUpdateQuery(putBody)} WHERE \`id\` = ${userId}`
        return getDbConnection().promise().query(queryString)
      },
      reason => {
        return Promise.reject(reason)
      })
    .then(() => getDbConnection().promise().query(`SELECT * FROM \`users\` WHERE \`id\` = ${userId}`),
      reason => {
        return Promise.reject(reason)
      })
    .then( ([rows]) => {
        const prettyResponse = JSON.stringify(rows[0], undefined, 2).concat(NEW_LINE)
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json')
        response.end(prettyResponse)
      },
      reason => {
        return Promise.reject(reason)
      })
    .catch(error => {
        console.error(error)
        response.statusCode = 400
        response.setHeader('Content-Type', 'text/plain')
        response.end(STATUS_MESSAGE.BAD_REQUEST.concat(NEW_LINE))
      }))
  request.on('error', error => {
      console.error(error.stack)
    })
}

exports.deleteUsersUserId = function (request, response) {
  const { url: requestUrl } = request
  const parsedUrl = url.parse(requestUrl, true)
  const userId = parsedUrl.query.id

  getDbConnection().promise().query(`DELETE FROM \`users\` WHERE \`id\` = ${userId}`)
    .then(() => {
        response.statusCode = 200
        response.end(STATUS_MESSAGE.USER_DELETED.concat(NEW_LINE))
      })
    .catch(error => {
        console.error(error)
        response.statusCode = 400
        response.setHeader('Content-Type', 'text/plain')
        response.end(STATUS_MESSAGE.BAD_REQUEST.concat(NEW_LINE))
      })
}

function prepareStringsForUpdateQuery(putBodyObject) {
  const resultStringsArray = []

  for (entry of Object.entries(putBodyObject)) {
    const keyValuePairString = `\`${entry[0]}\` = '${entry[1]}'`
    resultStringsArray.push(keyValuePairString)
  }

  return resultStringsArray
}
