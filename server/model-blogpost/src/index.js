module.exports = {
  ...require('./graphql'),
  modelName: 'Blogpost',
  model: require('./blogpost'),
  extending: '@pubsweet/model-fragment',
}
