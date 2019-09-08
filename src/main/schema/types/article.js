export default /* GraphQL */ `
  extend type Query {
    article(input: ArticleInput!): Article
  }

  input ArticleInput {
    hash: String
  }

  type Article {
    "Author of this article."
    author: String

    "Article title."
    title: String

    "A short summary for this article."
    summary: String

    "IPFS hash of this article."
    hash: String!

    "Content of this article."
    content: String!

    "Publish timestamp."
    createdAt: String!
  }

  type ArticleConnection implements Connection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [ArticleEdge!]
  }

  type ArticleEdge {
    cursor: String!
    node: Article!
  }
`
