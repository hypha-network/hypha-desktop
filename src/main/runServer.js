import { ipcMain } from 'electron'
// NOTE: The library ships with a fork of apollo-link-schema that also supports subscriptions.
import { createSchemaLink, createIpcExecutor } from 'graphql-transport-electron'

import {
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas
} from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'

// import schema from './my-graphql-schema'

const remoteUrl = 'https://server-test.matters.news/graphql'
const remoteLink = new HttpLink({
  uri: remoteUrl,
  fetch
})
// Introspect schema
const remoteSchema = await introspectSchema(remoteLink)
// Make remote executable schema
const remoteExecutableSchema = makeRemoteExecutableSchema({
  schema: remoteSchema,
  remoteHttpLink
})

const schema = {}

// NOTE: This also works with any other apollo link (e.g. HttpLink from apollo-link).
const link = createSchemaLink({ schema })
createIpcExecutor({ link, ipc: ipcMain })

export default context => {
  console.log('[NODE SERVER] started')
}
