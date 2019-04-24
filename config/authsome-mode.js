module.exports = {
  before: async (userId, operation, object, context) => true,
  // const user = userId && (await context.models.User.find(userId))
  // return user && user.admin
}
