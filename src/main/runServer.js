import { ipcMain } from 'electron'
// NOTE: The library ships with a fork of apollo-link-schema that also supports subscriptions.
import { createSchemaLink, createIpcExecutor } from 'graphql-transport-electron'
import schema from './my-graphql-schema'

// NOTE: This also works with any other apollo link (e.g. HttpLink from apollo-link).
const link = createSchemaLink({ schema })
createIpcExecutor({ link, ipc: ipcMain })

export default context => {
  console.log('[NODE SERVER] started')
}
