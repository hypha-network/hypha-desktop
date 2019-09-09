import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ipfs } from '../../../common/ipfs'
import { loadArticle } from '../../common/file'
import { Spinner } from '../Spinner'

import css from './articles.css'

export const Articles = () => {
  // const [loading, setLoading] = useState(true)
  // const [articles, setArticles] = useState([])
  const SUBSCRIPTIONS = gql`
    {
      viewer {
        subscriptions {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `
  const { loading, error, data } = useQuery(SUBSCRIPTIONS)

  console.log({ loading, error, data, SUBSCRIPTIONS })

  // useEffect(() => {
  //   const getPinset = async () => {
  //     if (ipfs) {
  //       const pinset = await ipfs.pin.ls()
  //       const articles = (await Promise.all(
  //         pinset.map(async data => {
  //           try {
  //             const { hash } = data

  //             // Parse entry html
  //             const article = await loadArticle(hash)
  //             return article
  //           } catch (error) {
  //             console.error(error)
  //             return null
  //           }
  //         })
  //       )).filter(article => article)

  //       setArticles(articles)
  //       setLoading(false)
  //     }
  //   }
  //   getPinset()
  // }, [ipfs])

  return (
    <section className={css.section}>
      {loading && (
        <Spinner
          containerClass={css.spinner}
          size={30}
          text="Articles loading ..."
        />
      )}
      {!loading && <div> {JSON.stringify(data)}</div>}
    </section>
  )
}
