const Joi = require('joi')

module.exports = {
  fragment: {
    // TODO remove these once pubsweet-component-posts-manager is upgraded
    fragmentType: Joi.string(),
    kind: Joi.string(),
    title: Joi.string(),
    published: Joi.bool(),
    published_at: Joi.string(),
    source: Joi.any(),
    presentation: Joi.string(),
    authors: Joi.array().items(Joi.string()),
  },
  collection: {
    title: Joi.string(),
  },
}
