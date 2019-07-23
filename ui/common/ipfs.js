import ipfsClient from 'ipfs-http-client'

export const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' })
