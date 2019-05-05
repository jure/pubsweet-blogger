const { readFileSync, writeFile } = require('fs')

const { defaultSchema: schema } = require('@atlaskit/adf-schema')
const { populateDefaultInstances } = require('./defaultinstances')

const MAX_STEP_HISTORY = 10000

// A collaborative editing document instance.
class Instance {
  constructor(id, doc) {
    this.id = id
    this.doc =
      doc ||
      schema.node('doc', null, [
        schema.node('paragraph', null, [
          schema.text(
            'This is a collaborative test document. Start editing to make it more interesting!',
          ),
        ]),
      ])

    // The version number of the document instance.
    this.version = 0
    this.steps = []
    this.lastActive = Date.now()
    this.users = Object.create(null)
    this.userCount = 0
    this.waiting = []

    this.collecting = null
  }

  stop() {
    if (this.collecting != null) clearInterval(this.collecting)
  }

  addEvents(version, steps, userId) {
    this.checkVersion(version)
    if (this.version !== version) return false
    let { doc } = this
    const maps = []
    for (let i = 0; i < steps.length; i += 1) {
      steps[i].userId = userId
      const result = steps[i].apply(doc)
      doc = result.doc
      maps.push(steps[i].getMap())
    }
    this.doc = doc
    this.version += steps.length
    this.steps = this.steps.concat(steps)
    if (this.steps.length > MAX_STEP_HISTORY)
      this.steps = this.steps.slice(this.steps.length - MAX_STEP_HISTORY)

    // eslint-disable-next-line
    console.log('this', this.version, 'data', version, steps)

    // this.sendUpdates()
    // scheduleSave()

    // Also return steps on adding events
    const startIndex = this.steps.length - (this.version - version)

    return { version: this.version, steps: this.steps.slice(startIndex) }
  }

  sendUpdates() {
    while (this.waiting.length) this.waiting.pop().finish()
  }

  // : (Number)
  // Check if a document version number relates to an existing
  // document version.
  checkVersion(version) {
    if (version < 0 || version > this.version) {
      const err = new Error(`Invalid version ${version}`)
      err.status = 400
      throw err
    }
  }

  // : (Number, Number)
  // Get events between a given document version and
  // the current document version.
  getEvents(version) {
    this.checkVersion(version)
    const startIndex = this.steps.length - (this.version - version)
    if (startIndex < 0) return false

    return { steps: this.steps.slice(startIndex), users: this.userCount }
  }

  // collectUsers() {
  //   const oldUserCount = this.userCount
  //   this.users = Object.create(null)
  //   this.userCount = 0
  //   this.collecting = null
  //   for (let i = 0; i < this.waiting.length; i += 1)
  //     this._registerUser(this.waiting[i].ip)
  //   if (this.userCount !== oldUserCount) this.sendUpdates()
  // }

  // registerUser(ip) {
  //   if (!(ip in this.users)) {
  //     this._registerUser(ip)
  //     this.sendUpdates()
  //   }
  // }

  // _registerUser(ip) {
  //   if (!(ip in this.users)) {
  //     this.users[ip] = true
  //     this.userCount = this.userCount + 1
  //     if (this.collecting == null)
  //       this.collecting = setTimeout(() => this.collectUsers(), 5000)
  //   }
  // }
}

const instances = Object.create(null)
let instanceCount = 0
const maxCount = 20

const saveFile = `${__dirname}/../demo-instances.json`
let json

if (process.argv.indexOf('--fresh') === -1) {
  try {
    json = JSON.parse(readFileSync(saveFile, 'utf8'))
  } catch (e) {
    // eslint-disable-next-line
    console.log(e)
  }
}

if (json) {
  // eslint-disable-next-line
  for (const prop in json) {
    newInstance(prop, schema.nodeFromJSON(json[prop].doc))
  }
} else {
  populateDefaultInstances(newInstance)
}

let saveTimeout = null
const saveEvery = 1e4

function scheduleSave() {
  if (saveTimeout != null) return
  saveTimeout = setTimeout(doSave, saveEvery)
}

function doSave() {
  saveTimeout = null
  const out = {}

  // eslint-disable-next-line
  for (const prop in instances) {
    out[prop] = {
      doc: instances[prop].doc.toJSON(),
    }
  }
  writeFile(saveFile, JSON.stringify(out), () => null)
}

function getInstance(id) {
  const inst = instances[id] || newInstance(id)
  if (ip) inst.registerUser(ip)
  inst.lastActive = Date.now()
  return inst
}
exports.getInstance = getInstance

function newInstance(id, doc) {
  instanceCount += 1
  if (instanceCount > maxCount) {
    let oldest = null
    // eslint-disable-next-line
    for (const id in instances) {
      const inst = instances[id]
      if (!oldest || inst.lastActive < oldest.lastActive) oldest = inst
    }
    instances[oldest.id].stop()
    delete instances[oldest.id]
    instanceCount -= 1
  }
  return (instances[id] = new Instance(id, doc))
}

function instanceInfo() {
  const found = []
  // eslint-disable-next-line
  for (const id in instances) {
    found.push({ id, users: instances[id].userCount })
  }
  return found
}
exports.instanceInfo = instanceInfo
