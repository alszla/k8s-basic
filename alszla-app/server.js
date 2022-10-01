const config = require('./config.js')
const server = require('./controller.js')
const { APP_PORT, APP_HOSTNAME } = config

server.listen(APP_PORT, APP_HOSTNAME, () => {
  console.info(`App Server running at: http://${APP_HOSTNAME}:${APP_PORT}`)
})
