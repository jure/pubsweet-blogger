import config from 'config'
import { SMTPServer } from 'smtp-server'

const { transport } = require(config.get('mailer.path'))

const promiseQueue = []
const resolveQueue = []

// start dummy mail server
function start() {
  const server = new SMTPServer({
    // always authorize
    onAuth: (auth, session, cb) => cb(null, { user: {} }),
    onData: (stream, session, cb) => {
      const chunks = []
      stream.on('data', chunk => chunks.push(chunk))
      stream.on('end', () => {
        if (!resolveQueue.length) makePromise()
        const resolve = resolveQueue.shift()
        resolve(chunks.join(''))
        cb()
      })
    },
  })

  server.listen(transport.port)
}

// get the next email (wait if necessary)
function nextEmail() {
  if (!promiseQueue.length) makePromise()
  return promiseQueue.shift()
}

// email sending and waiting may happen in any order so we have a queue for each
function makePromise() {
  promiseQueue.push(new Promise(resolve => resolveQueue.push(resolve)))
}

module.exports = {
  start,
  nextEmail,
}
