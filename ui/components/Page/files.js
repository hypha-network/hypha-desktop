import React, { useEffect, useState } from 'react'

import { ipfs } from '../../common/ipfs'
import { Spinner } from '../Spinner'

import css from './files.css'

export const Files = () => {
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
          text="Files loading ..."
        />
      )}
    </section>
  )
}
