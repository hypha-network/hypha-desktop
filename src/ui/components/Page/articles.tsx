import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { Spinner } from "../Spinner"
import css from "./articles.css"
import { HashContext } from "../Context/hash"
import { PageContext } from "../Context/page"

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
              hash
            }
          }
        }
      }
    }
  `
  const { setPage } = useContext(PageContext)
  const { setHash } = useContext(HashContext)

  const { loading, error, data } = useQuery(SUBSCRIPTIONS)

  if (loading) {
    return (
      <Spinner
        sectionClass={css.section}
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
      {data.viewer.subscriptions.edges.map(({ node }, index) => {
        const timestamp = new Date(node.createdAt)
        const createdAt = isNaN(timestamp.getTime())
          ? "-"
          : timestamp.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })

        const { author, title, hash } = node
        return (
          <div
            style={{
              width: "100%",
              margin: 10,
              marginTop: 20,
              paddingBottom: 5,
              display: "grid",
              gridGap: "2%",
              gridTemplateColumns: "50% 30% 15%",
              borderBottom: "1px solid rgba(0,0,0,.1)",
            }}
            key={index}
          >
            <span
              onClick={() => {
                setPage("explore")
                setHash(hash)
              }}
              style={{
                cursor: "pointer",
              }}
            >
              {title}
            </span>

            <span>{author}</span>
            <span>{createdAt}</span>
          </div>
        )
      })}
    </section>
  )
}
