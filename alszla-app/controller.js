const http = require('http')
const url = require('url')
const service = require('./service.js')

module.exports = http.createServer((request, response) => {
  const { url: requestUrl, method } = request
  const parsedUrl = url.parse(requestUrl, true)
  const pathname = parsedUrl.pathname

  console.info('Request:', method, parsedUrl.path)

  // GET users
  if (pathname === '/users' && method === 'GET' && !parsedUrl.query.id) {
    service.getUsers(request, response)

    // GET users?id=
  } else if (pathname === '/users' && method === 'GET' && parsedUrl.query.id) {
    service.getUsersUserId(request, response)

    // POST /users
  } else if (pathname === '/users' && method === 'POST' && !parsedUrl.query.id) {
    service.postUsers(request, response)

    // PUT /users?id=
  } else if (pathname === '/users' && method === 'PUT' && parsedUrl.query.id) {
    service.putUsers(request, response)

    // DELETE /users?id=
  } else if (pathname === '/users' && method === 'DELETE' && parsedUrl.query.id) {
    service.deleteUsersUserId(request, response)

    // Invalid Request
  } else {
    service.invalidRequest(request, response)
  }
})
