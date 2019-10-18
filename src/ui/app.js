import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { client } from './common/apollo'
import {
  HashProvider,
  PageProvider,
  IpfsProvider,
  SideMenu
} from './components'
import { Page } from './pages'

import css from './app.css'

export const App = () => (
  <ApolloProvider client={client}>
    <IpfsProvider>
      <PageProvider>
        <HashProvider>
          <main className={css.main}>
            <SideMenu />
            <Page />
          </main>
        </HashProvider>
      </PageProvider>
    </IpfsProvider>
  </ApolloProvider>
)
