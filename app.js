const logger = require('@pubsweet/logger')
const startServer = require('pubsweet-server')

startServer().catch(err => {
  logger.error('FATAL ERROR, SHUTTING DOWN:', err)
  process.exit(1)
})
