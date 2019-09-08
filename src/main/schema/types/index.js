import article from './article'
import user from './user'

const Root = /* GraphQL */ `
  type Query
  type Mutation

  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  interface Connection {
    totalCount: Int!
    pageInfo: PageInfo!
  }

  input ConnectionArgs {
    after: String
    first: Int
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

export default [Root, article, user]
