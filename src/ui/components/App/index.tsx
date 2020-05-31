import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"

import { client } from "../../common/apollo"
import { HashProvider } from "../Context/hash"
import { PageProvider } from "../Context/page"
import { Page } from "../Page"
import { SideMenu } from "../Menu/side"

import * as css from "./style.css"

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
