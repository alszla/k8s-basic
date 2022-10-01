const http = require('http')
const url = require('url')

module.exports = http.createServer((request, response) => {
  const service = require('./service.js')
  const { url: requestUrl, method } = request
  const parsedUrl = url.parse(requestUrl, true)
  const pathname = parsedUrl.pathname

  console.info('Request:', method, parsedUrl.path)

  // GET users
  if (pathname === '/users' && method === 'GET' && !parsedUrl.query.id) {
    service.getUsers(request, response)
  } else {
    service.invalidRequest(request, response)
  }
})
