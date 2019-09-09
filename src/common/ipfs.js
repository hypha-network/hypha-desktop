import fileType from 'file-type'
import ipfsClient from 'ipfs-http-client'

export const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' })

export const loadArticle = async hash => {
  try {
    const files = await ipfs.get(hash)

    // Filter data
    const data = files.reduce((sum, file) => {
      const { path, content } = file
      const cleannedPath = path.replace(`${hash}/`, '')
      if (cleannedPath && content) {
        sum[`${cleannedPath}`] = content
      }
      return sum
    }, {})

    // currently only support index.html
    return data['index.html']
  } catch (error) {
    console.error(error)
    return undefined
  }
}
