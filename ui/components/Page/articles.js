import React, { useEffect, useState } from 'react'

import { ipfs } from '../../common/ipfs'
import { Spinner } from '../Spinner'

import css from './articles.css'

export const Articles = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (ipfs) {
      // TODO: Add files viewer
    }
  }, [])

  return (
    <section className={css.section}>
      {loading && (
        <Spinner
          containerClass={css.spinner}
          size={30}
          text="Articles loading ..."
        />
      )}
    </section>
  )
}
