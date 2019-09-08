import React, { useEffect, useState } from 'react'

import { ipfs } from '../../common/ipfs'
import { loadArticle } from '../../common/file'
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
              const article = await loadArticle(hash)
              return article
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
      {!loading && <div> {JSON.stringify(articles[0]['title'])}</div>}
    </section>
  )
}
