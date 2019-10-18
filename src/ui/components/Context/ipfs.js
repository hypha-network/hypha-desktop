import IPFS from 'ipfs'
import React, { createContext, useState, useEffect } from 'react'

export const IpfsContext = createContext({
  ipfsNode: null
})

export const IpfsConsumer = IpfsContext.Consumer

export const IpfsProvider = ({ children }) => {
  const [ipfsNode, setIpfsNode] = useState(null)

  useEffect(() => {
    IPFS.create({
      libp2p: {
        config: {
          dht: {
            enabled: true
          }
        }
      }
    }).then((node, error) => {
      if (error) {
        throw error
      }
      setIpfsNode(node)
    })
  }, [])

  return (
    <IpfsContext.Provider value={{ ipfsNode }}>{children}</IpfsContext.Provider>
  )
}
