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

// import localSchema from './schema'
const localSchema = {}

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
  remoteLink
})

const schema = mergeSchemas({
  schemas: [remoteExecutableSchema, localSchema]
})

const link = createSchemaLink({ schema })
createIpcExecutor({ link, ipc: ipcMain })

export default context => {
  console.log('[NODE SERVER] started')
}
