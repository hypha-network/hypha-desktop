import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './types'
import queries from './queries'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: queries
})

export default schema
