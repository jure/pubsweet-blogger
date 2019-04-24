const logger = require('winston')
const path = require('path')

module.exports = {
  'pubsweet-server': {
    db: { database: 'test' },
    logger,
    port: 4000,
    baseUrl: 'http://localhost:4000',
    secret: 'test',
  },
  mailer: {
    path: path.join(__dirname, 'mailer_test.js'),
  },
  'password-reset': {
    url: 'http://localhost:4000/password-reset',
  },
}
