const { model: Fragment } = require('@pubsweet/model-fragment')

class Blogpost extends Fragment {
  static get schema() {
    return {
      properties: {
        fragmentType: { type: 'string', const: 'blogpost' },
        source: { type: ['string', 'null'] },
        kind: { type: ['string', 'null'] },
        title: { type: 'string' },
        presentation: { type: ['string', 'null'] },
        published: { type: ['boolean', 'null'] },
        filtered: { type: ['string', 'null'] },
        version: { type: ['number', 'null'] },
        steps: { type: ['array', 'null'], items: { type: 'object' } },
      },
    }
  }

  static get relationMappings() {
    return {
      team: {
        relation: Blogpost.HasOneRelation,
        modelClass: require.resolve('@pubsweet/model-team/src/team'),
        join: {
          from: 'fragments.id',
          to: 'teams.objectId',
        },
      },
    }
  }
}

Blogpost.type = 'fragment'
module.exports = Blogpost
