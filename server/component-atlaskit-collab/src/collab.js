// const express = require('express')
// const bodyParser = require('body-parser')

const cors = require('cors')

const { Step } = require('prosemirror-transform')
const { defaultSchema: schema } = require('@atlaskit/adf-schema')
const socketIo = require('socket.io')
// const { getInstance } = require('./instance')

const MAX_STEP_HISTORY = 10000

const checkVersion = (remoteVersion, localVersion) => {
  if (remoteVersion < 0 || remoteVersion > localVersion) {
    const err = new Error(`Invalid version ${remoteVersion}`)
    err.status = 400
    throw err
  }
}
// function reqIP(request) {
//   return request.headers['x-forwarded-for'] || request.socket.remoteAddress
// }

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
  // app.options('/document', cors())
  // app.get('/document', cors(), authBearer, (req, res) => {
  //   console.log(req.path, req.user)
  //   res.send(instanceInfo())
  // })

  app.options('/document/:id', cors())
  app.get('/document/:id', cors(), authBearer, async (req, res) => {
    const document = await app.locals.models.Blogpost.query().findById(
      req.params.id,
    )

    // Initialize document on get, as hacky as they come.
    let version
    let doc
    if (document.source) {
      doc = JSON.parse(document.source)
      // The version number of the document instance.
      version = document.version
    } else {
      doc = schema
        .node('doc', null, [
          schema.node('paragraph', null, [
            schema.text(
              'This is a collaborative test document. Start editing to make it more interesting!',
            ),
          ]),
        ])
        .toJSON()
      document.source = JSON.stringify(doc)
      document.steps = []
      version = 0
      document.version = 0
      await document.save()
    }

    res.send({
      doc,
      version,
    })
  })

  // An endpoint for a collaborative document instance which
  // returns all events between a given version and the server's
  // current version of the document.
  app.options('/document/:id/steps', cors())
  app.get('/document/:id/steps', cors(), authBearer, async (req, res) => {
    const remoteVersion = nonNegInteger(req.query.version)

    const document = await app.locals.models.Blogpost.query().findById(
      req.params.id,
    )

    const getEvents = version => {
      checkVersion(version, document.version)
      const startIndex = document.steps.length - (document.version - version)
      if (startIndex < 0) return false

      return { steps: document.steps.slice(startIndex) }
    }

    const data = getEvents(remoteVersion)

    if (data === false) res.status(410).send('History no longer available')

    // If the server version is greater than the given version,
    // return the data immediately.
    res.send({
      version: document.version,
      steps: data.steps,
      clientIDs: data.steps.map(step => step.clientID),
    })
  })

  // The event submission endpoint, which a client sends an event to.
  app.post('/document/:id/steps', cors(), authBearer, async (req, res) => {
    const version = nonNegInteger(req.body.version)
    const steps = req.body.steps.map(s => Step.fromJSON(schema, s))
    const clientId = req.headers['user-session-id']
    console.log(req.headers)
    const document = await app.locals.models.Blogpost.query().findById(
      req.params.id,
    )

    let doc = schema.nodeFromJSON(JSON.parse(document.source))

    const addEvents = async (remoteVersion, userId) => {
      checkVersion(remoteVersion, document.version)
      if (document.version !== remoteVersion) return false

      // const maps = []
      for (let i = 0; i < steps.length; i += 1) {
        steps[i].userId = userId
        const result = steps[i].apply(doc)
        doc = result.doc
        // maps.push(steps[i].getMap())
      }

      // Hack to get the userId set at the right place
      let stepsJson = JSON.parse(JSON.stringify(steps))
      stepsJson = stepsJson.map(s => {
        s.userId = clientId
        return s
      })

      document.source = JSON.stringify(doc.toJSON())
      document.version += stepsJson.length
      document.steps = document.steps.concat(stepsJson)
      if (document.steps.length > MAX_STEP_HISTORY)
        document.steps = document.steps.slice(
          document.steps.length - MAX_STEP_HISTORY,
        )

      await document.save()
      // this.sendUpdates()
      // scheduleSave()

      // Also return steps on adding events
      const startIndex =
        document.steps.length - (document.version - remoteVersion)

      // eslint-disable-next-line
      console.log('this', document.version, 'data', remoteVersion, steps, startIndex)

      return {
        version: document.version,
        steps: document.steps.slice(startIndex),
      }
    }

    const result = await addEvents(version, clientId)

    if (!result) return res.status(409).send('Version not current')

    let json = JSON.stringify(result)
    json = JSON.parse(json)

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
