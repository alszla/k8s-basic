const server = require('./controller.js')
const HOSTNAME = '0.0.0.0'
const PORT = 8080

server.listen(PORT, HOSTNAME, () => {
  console.info(`Server running at: http://${HOSTNAME}:${PORT}`)
})
