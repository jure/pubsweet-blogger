const { deferConfig } = require('config/defer')

module.exports = {
  'pubsweet-server': {
    db: {
      database: 'starter',
    },
    baseUrl: deferConfig(
      cfg => `http://localhost:${cfg['pubsweet-server'].port}`,
    ),
    morganLogFormat:
      ':method :url :status :graphql[operation] :res[content-length] :response-time ms',
  },
  dbManager: {
    username: 'admin',
    password: 'password',
    email: 'admin@example.com',
    admin: true,
  },
}
