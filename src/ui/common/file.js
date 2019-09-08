import fileType from 'file-type'
import { ipfs } from './ipfs'
import * as cheerio from 'cheerio'

export const bufferToDataURI = buffer => {
  const { ext, mime } = fileType(buffer)
  return `data:${mime};base64,${buffer.toString('base64')}`
}

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

    // Parse entry html
    if (!data['index.html']) {
      return null
    }

    const $ = cheerio.load(data['index.html'].toString('utf8'), {
      decodeEntities: false,
      xmlMode: true
    })
    $('img').each((index, image) => {
      const element = $(image)
      const src = element.attr('src')
      element.attr('src', bufferToDataURI(data[src]))
    })

    // get info and parse into article
    return {
      html: $('body').html(),
      title: $('title').text(),
      description: $("meta[name='description']").attr('content'),
      author: $("meta[property='article:author']").attr('content'),
      timestamp: $("time[itemprop='datePublished']").attr('datetime')
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}
