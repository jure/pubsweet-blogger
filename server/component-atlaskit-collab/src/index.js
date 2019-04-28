module.exports = {
  server: () => app => require('./collab')(app),
}
