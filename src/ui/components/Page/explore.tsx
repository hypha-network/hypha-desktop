import React, { useContext, useEffect, useState, useRef } from "react"

import { getLocalHttp } from "../../../common/ipfs"
import { HashContext } from "../Context/hash"
import { HashBar } from "../Bar/hash"
import { Welcome } from "../Welcome"
import { Spinner } from "../Spinner"

import css from "./explore.css"

export const Explore = () => {
  const { hash } = useContext(HashContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (hash) {
      setLoading(true)
    }
  }, [hash])

  const iframeEl = useRef(null)

  return (
    <section className={css.section}>
      <HashBar />

      {!hash && <Welcome />}

      {hash && loading && (
        <Spinner
          sectionClass={css.section}
          containerClass={css.spinner}
          size={30}
          text="Content loading ..."
        />
      )}

      {hash && (
        <main className={css.htmlContainer}>
          <iframe
            ref={iframeEl}
            src={getLocalHttp(hash)}
            style={
              loading
                ? { width: 0, height: 0, border: 0 }
                : {
                    width: "100%",
                    height: "-webkit-fill-available",
                    border: 0,
                  }
            }
            onLoad={() => {
              setLoading(false)
            }}
          />
        </main>
      )}
    </section>
  )
}
