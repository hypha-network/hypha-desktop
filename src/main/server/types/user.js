export default /* GraphQL */ `
  extend type Query {
    viewer: User
  }

  type User {
    "Artilces current user subscribed to."
    subscriptions(input: ConnectionArgs): ArticleConnection!
  }
`
