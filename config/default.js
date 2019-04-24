const path = require('path')
const logger = require('winston')
const components = require('./components.json')

module.exports = {
  'pubsweet-server': {
    db: {
      database: 'starter',
    },
    logger,
    port: 3000,
    uploads: 'uploads',
    morganLogFormat: 'combined',
  },
  'pubsweet-client': {
    API_ENDPOINT: '/api',
    theme: 'PepperTheme',
    'login-redirect': '/dashboard',
  },
  authsome: {
    // this should be either an npm package or an absolute path, not a relative path
    mode: path.resolve(__dirname, './authsome-mode.js'),
    teams: {
      seniorUser: {
        name: 'Senior User',
      },
      simpleUser: {
        name: 'Simple User',
      },
    },
  },
  pubsweet: {
    components,
  },
  'password-reset': {
    url: 'http://localhost:3000/password-reset',
    sender: 'noreply@pubsweet.org',
  },
  mailer: {
    path: path.join(__dirname, 'mailer'),
    from: 'nobody@example.com',
  },
  publicKeys: ['pubsweet-client', 'authsome', 'pubsweet', 'validations'],
}
