const url = require('url')

exports.invalidRequest = function(request, response) {
  response.statusCode = 404
  response.setHeader('Content-Type', 'application/json')
  response.end('Invalid Request\n')
}

exports.getUsers = function (request, response) {
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.end('I am alive\n')
}