import * as cheerio from 'cheerio'
import React, { useContext, useEffect, useState } from 'react'

import { bufferToDataURI, loadArticle } from '../../common/file'
import { ipfs } from '../../../common/ipfs'
import { PinButton } from '../Button/pin'
import { HashContext } from '../Context/hash'
import { HashBar } from '../Bar/hash'
import { Welcome } from '../Welcome'
import { Spinner } from '../Spinner'

import css from './explore.css'
import { Articles } from './articles'

export const Explore = () => {
  const { hash } = useContext(HashContext)

  const [loading, setLoading] = useState(false)

  const [html, setHtml] = useState('')

  useEffect(() => {
    if (hash) {
      setHtml('')
      setLoading(true)
      loadArticle(hash).then(article => {
        if (article.html) {
          setHtml(article.html)
          setLoading(false)
        }
      })
    }
  }, [hash])

  return (
    <section className={css.section}>
      <HashBar />

      {!hash && <Welcome />}

      {hash && loading && (
        <Spinner
          containerClass={css.spinner}
          size={30}
          text="Content loading ..."
        />
      )}

      {html && (
        <>
          <div className={css.htmlContainer}>
            <div
              className={css.html}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <PinButton />
        </>
      )}
    </section>
  )
}
