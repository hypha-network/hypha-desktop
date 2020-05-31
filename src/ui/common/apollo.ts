import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ipcRenderer } from 'electron'
import { createIpcLink } from 'graphql-transport-electron'

const link = createIpcLink({ ipc: ipcRenderer })
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})
