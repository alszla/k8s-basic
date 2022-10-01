const DEFAULT_CONFIG = {
  // App
  APP_HOSTNAME: '0.0.0.0',
  APP_PORT: 9090,

  // Database
  DB_HOST: '0.0.0.0',
  DB_PORT: '3306',
  DB_SCHEMA: 'database',
  DB_USER: 'user',
  DB_PASSWORD: ''
}

const config = {}
for (parameter of Object.keys(DEFAULT_CONFIG)) {
  config[parameter] = (process.env[parameter]) ? process.env[parameter] : DEFAULT_CONFIG[parameter]
}

module.exports = config
