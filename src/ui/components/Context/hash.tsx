import React, { createContext, useState } from 'react'

export const HashContext = createContext({
  hash: '',
  setHash: (hash: string) => {}
})

export const HashConsumer = HashContext.Consumer

export const HashProvider = ({ children, defaultHash = '' }) => {
  const [hash, setHash] = useState(defaultHash)

  return (
    <HashContext.Provider value={{ hash, setHash }}>
      {children}
    </HashContext.Provider>
  )
}
