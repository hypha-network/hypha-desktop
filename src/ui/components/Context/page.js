import React, { createContext, useEffect, useState } from 'react'

export const PageContext = createContext({
  page: 'explore',
  setPage: hash => {}
})

export const PageConsumer = PageContext.Consumer

export const PageProvider = ({ children, defaultPage }) => {
  const [page, setPage] = useState(defaultPage || 'explore')

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  )
}
