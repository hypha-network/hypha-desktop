import React, { useEffect, useState } from 'react'

import { ipfs } from '../../common/ipfs'
import { loadHTML } from '../../common/file'
import { Spinner } from '../Spinner'

import css from './articles.css'

export const Articles = () => {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const getPinset = async () => {
      if (ipfs) {
        const pinset = await ipfs.pin.ls()
        const articles = (await Promise.all(
          pinset.map(async data => {
            try {
              const { hash } = data

              // Parse entry html
              const $ = await loadHTML(hash)
              return $
                ? {
                    html: $,
                    title: $('title').text(),
                    description: $("meta[name='description']").attr('content'),
                    author: $("meta[property='article:author']").attr(
                      'content'
                    ),
                    timestamp: $("time[itemprop='datePublished']").attr(
                      'datetime'
                    )
                  }
                : null
            } catch (error) {
              console.error(error)
              return null
            }
          })
        )).filter(article => article)

        setArticles(articles)
        setLoading(false)
      }
    }
    getPinset()
  }, [ipfs])

  return (
    <section className={css.section}>
      {loading && (
        <Spinner
          containerClass={css.spinner}
          size={30}
          text="Articles loading ..."
        />
      )}
      {!loading && <div> {JSON.stringify(articles)}</div>}
    </section>
  )
}
