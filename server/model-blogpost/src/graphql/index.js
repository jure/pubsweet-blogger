const resolvers = {
  Query: {
    async post(_, { id }, ctx) {
      const post = await ctx.connectors.Blogpost.model
        .query()
        .findById(id)
        .eager('[team.[members.[user, alias]]]')
      return post
    },
    async posts(_, { where }, ctx) {
      const posts = await ctx.connectors.Blogpost.model
        .query()
        .eager('[team.[members.[user, alias]]]')
      return posts
    },
  },
  Mutation: {
    async createPostWithTeam(_, { input }, ctx) {
      // Create a new fragment
      const blogpost = await ctx.connectors.Blogpost.create(input, ctx)

      // Create a new team for it
      const teamInput = {
        role: 'author',
        name: `Authors of post ${blogpost.id}`,
        objectId: blogpost.id,
        objectType: 'blogpost',
        members: [
          {
            user: {
              id: ctx.user,
            },
          },
        ],
      }
      const options = {
        relate: ['members.user'],
        unrelate: ['members.user'],
        allowUpsert: '[members, members.alias]',
        eager: '[members.[user.teams, alias]]',
      }

      await ctx.connectors.Team.create(teamInput, ctx, options)

      // Get the blogpost with all its relations
      const post = await ctx.connectors.Blogpost.model
        .query()
        .eager('[team.[members.[user, alias]]]')
        .findById(blogpost.id)

      return post
    },
  },
}

const typeDefs = `
  extend type Query {
    post(id: ID): PostWithTeam
    posts: [PostWithTeam]
  }

  extend type Mutation {
    createPostWithTeam(input: FragmentInput): PostWithTeam
    addAuthorToPost(postId: ID!, userId: ID!): PostWithTeam
    removeAuthorFromPost(postId: ID!, userId: ID!): PostWithTeam
  }

  type PostWithTeam {
    id: ID!
    type: String!
    title: String
    published: Boolean
    presentation: String
    source: String
    team: Team
    updated: String
    created: String
  }

  extend input FragmentInput {
    source: String
    kind: String
    title: String
    presentation: String
    published: Boolean
    filtered: String
    path: String
  }
`

module.exports = { typeDefs, resolvers }
