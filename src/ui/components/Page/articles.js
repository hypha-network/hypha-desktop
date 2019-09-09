import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Spinner } from '../Spinner'
import css from './articles.css'

export const Articles = () => {
  const SUBSCRIPTIONS = gql`
    {
      viewer {
        subscriptions {
          edges {
            node {
              title
              author
              createdAt
            }
          }
        }
      }
    }
  `
  const { loading, error, data } = useQuery(SUBSCRIPTIONS)

  if (loading) {
    return (
      <Spinner
        containerClass={css.spinner}
        size={30}
        text="Articles loading ..."
      />
    )
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <section className={css.section} style={{ paddingTop: 20 }}>
      {data.viewer.subscriptions.edges.map(({ node }) => {
        const timestamp = new Date(node.createdAt)
        const createdAt = isNaN(timestamp.getTime())
          ? '-'
          : timestamp.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })

        return (
          <div
            style={{
              width: '100%',
              margin: 10,
              marginTop: 20,
              paddingBottom: 5,
              display: 'grid',
              'grid-gap': '2%',
              'grid-template-columns': '50% 30% 15%',
              'border-bottom': '1px solid rgba(0,0,0,.1)'
            }}
          >
            <span>{node.title}</span>

            <span>{node.author}</span>
            <span>{createdAt}</span>
          </div>
        )
      })}
    </section>
  )
}
