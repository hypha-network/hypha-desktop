import React, { createContext, useState } from 'react'

// export type PageNameType = "explore" | "article" | "peers" | "bootstrap"

export const PageContext = createContext({
  page: 'explore',
  setPage: (hash: string) => {}
})

export const PageConsumer = PageContext.Consumer

export const PageProvider = ({ children, defaultPage = 'explore' }) => {
  const [page, setPage] = useState(defaultPage)

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  )
}
