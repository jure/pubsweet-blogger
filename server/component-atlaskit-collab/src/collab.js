// const express = require('express')
// const bodyParser = require('body-parser')

const cors = require('cors')

const { Step } = require('prosemirror-transform')
const { defaultSchema: schema } = require('@atlaskit/adf-schema')
const socketIo = require('socket.io')
const { getInstance, instanceInfo } = require('./instance')

// An object to assist in waiting for a collaborative editing
// instance to publish a new version before sending the version
// event data to the client.
class Waiting {
  constructor(res, inst, ip, finish) {
    this.res = res
    this.inst = inst
    this.ip = ip
    this.finish = finish
    this.done = false
    res.setTimeout(1000 * 60 * 5, () => {
      this.abort()
      this.send({})
    })
  }

  abort() {
    const found = this.inst.waiting.indexOf(this)
    if (found > -1) this.inst.waiting.splice(found, 1)
  }

  send(output) {
    if (this.done) return
    output.res(this.res)
    this.done = true
  }
}

function outputEvents(inst, data) {
  return {
    version: inst.version,
    steps: data.steps.map(s => s.toJSON()),
    clientIDs: data.steps.map(step => step.clientID),
    users: data.users,
  }
}

function reqIP(request) {
  return request.headers['x-forwarded-for'] || request.socket.remoteAddress
}

function nonNegInteger(str) {
  const num = Number(str)
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(num) && Math.floor(num) === num && num >= 0) return num
  const err = new Error(`Not a non-negative integer: ${str}`)
  err.status = 400
  throw err
}

const collab = app => {
  // Get the currently authenticated user's information via a token
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })

  const io = socketIo(8080)

  io.on('connection', socket => {
    // eslint-disable-next-line
    console.log(new Date(), 'socket connected')

    socket.on('disconnect', () => {
      io.emit('User disconnected')
    })

    socket.on('join', room => {
      socket.join(room)
    })

    socket.on('leave', room => {
      socket.leave(room)
    })
  })

  // The root endpoint outputs a list of the collaborative
  // editing document instances.
  app.options('/document', cors())
  app.get('/document', cors(), authBearer, (req, res) => {
    console.log(req.path, req.user)
    res.send(instanceInfo())
  })

  app.options('/document/:id', cors())
  app.get('/document/:id', cors(), authBearer, (req, res) => {
    console.log(req.path, req.user)
    const inst = getInstance(req.params.id, reqIP(req))

    res.send({
      doc: inst.doc.toJSON(),
      users: inst.userCount,
      version: inst.version,
    })
  })

  // An endpoint for a collaborative document instance which
  // returns all events between a given version and the server's
  // current version of the document.
  app.options('/document/:id/steps', cors())
  app.get('/document/:id/steps', cors(), authBearer, (req, res) => {
    console.log(req.path, req.user)
    const version = nonNegInteger(req.query.version)
    const commentVersion = nonNegInteger(req.query.commentVersion)

    const inst = getInstance(req.params.id, reqIP(req))
    const data = inst.getEvents(version, commentVersion)
    if (data === false) res.status(410).send('History no longer available')

    // If the server version is greater than the given version,
    // return the data immediately.
    if (data.steps.length || data.comment.length)
      res.send(outputEvents(inst, data))

    // If the server version matches the given version,
    // wait until a new version is published to return the event data.
    const wait = new Waiting(res, inst, reqIP(req), () => {
      wait.send(outputEvents(inst, inst.getEvents(version, commentVersion)))
    })
    inst.waiting.push(wait)

    res.on('finish', () => wait.abort())
  })

  // The event submission endpoint, which a client sends an event to.
  app.post('/document/:id/steps', cors(), authBearer, (req, res) => {
    console.log(req.path, req.user)
    const version = nonNegInteger(req.body.version)
    const steps = req.body.steps.map(s => Step.fromJSON(schema, s))
    const clientId = req.headers['user-ari']

    // eslint-disable-next-line
    console.log(clientId)

    const result = getInstance(req.params.id, reqIP(req)).addEvents(
      version,
      steps,
      clientId,
    )
    if (!result) return res.status(409).send('Version not current')

    // Hack to get the userId set at the right place
    let json = JSON.stringify(result)
    json = JSON.parse(json)
    json.steps = json.steps.map(s => {
      s.userId = clientId
      return s
    })
    io.to(`collab-service/${req.params.id}`).emit('steps:created', json)
    return res.json(json)
  })

  app.options('/document/:id/telepointer', cors())
  app.post('/document/:id/telepointer', cors(), authBearer, (req, res) => {
    io.to(`collab-service/${req.params.id}`).emit(
      'telepointer:updated',
      req.body,
    )

    return res.status(200).send(req.body)
  })

  app.options('/document/:id/user/:id', cors())
  app.get('/document/:id/user/:id', cors(), authBearer, async (req, res) => {
    let user = await app.locals.models.User.find(req.params.id)
    user = { username: user.username, id: user.id }

    return res.status(200).send({ user })
  })
}

module.exports = collab
