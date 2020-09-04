import fetch from 'isomorphic-fetch'
import ipfsClient from 'ipfs-http-client'

export const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' })

export const getLocalHttp = hash => `http://localhost:8080/ipfs/${hash}`

export const loadArticle = async hash => {
  try {
    const res = await fetch(getLocalHttp(hash))
    const html = await res.text()
    return html
  } catch (error) {
    console.error(error)
    return undefined
  }
}
