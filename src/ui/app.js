import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { client } from './common/apollo'
import { HashProvider } from './components/Context/hash'
import { PageProvider } from './components/Context/page'
import { Page } from './pages'
import { SideMenu } from './components/Menu'

import css from './app.css'

export const App = () => (
  <ApolloProvider client={client}>
    <PageProvider>
      <HashProvider>
        <main className={css.main}>
          <SideMenu />
          <Page />
        </main>
      </HashProvider>
    </PageProvider>
  </ApolloProvider>
)
