import * as cheerio from 'cheerio'
import { loadArticle } from '../../../common/ipfs'

export default {
  Query: {
    article: async (root, { input: { hash } }) => {
      const content = await loadArticle(hash)
      return { content }
    }
  },
  Article: {
    title: ({ content }) =>
      cheerio
        .load(content)('title')
        .text(),
    summary: ({ content }) =>
      cheerio
        .load(content)("meta[name='description']")
        .attr('content'),
    author: ({ content }) =>
      cheerio
        .load(content)("meta[property='article:author']")
        .attr('content'),
    createdAt: ({ content }) =>
      cheerio
        .load(content)("time[itemprop='datePublished']")
        .attr('datetime')
  }
}
