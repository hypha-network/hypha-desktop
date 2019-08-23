import * as cheerio from 'cheerio'
import React, { useContext, useEffect, useState } from 'react'

import { bufferToDataURI } from '../../common/file'
import { ipfs } from '../../common/ipfs'
import { PinButton } from '../Button/pin'
import { HashContext } from '../Context/hash'
import { HashBar } from '../Bar/hash'
import { Welcome } from '../Welcome'
import { Spinner } from '../Spinner'

import css from './explore.css'

export const Explore = () => {
  const { hash } = useContext(HashContext)

  const [loading, setLoading] = useState(false)

  const [html, setHtml] = useState('')

  const get = hash => {
    ipfs.get(hash, (err, files) => {
      if (err) {
        console.log(err)
        return undefined
      }

      if (files && files.length > 0) {
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
        const $ = cheerio.load(data['index.html'].toString('utf8'), {
          decodeEntities: false,
          xmlMode: true
        })
        $('img').each((index, image) => {
          const element = $(image)
          const src = element.attr('src')
          element.attr('src', bufferToDataURI(data[src]))
        })
        setHtml($('body').html())
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    if (hash) {
      setHtml('')
      setLoading(true)
      get(hash)
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
