import React, { useEffect, useState } from 'react'

import { ipfs } from '../../common/ipfs'
import { Spinner } from '../Spinner'

import css from './articles.css'

export const Articles = () => {
  const [loading, setLoading] = useState(true)
  const [pinset, setPinset] = useState([])

  useEffect(() => {
    const getPinset = async () => {
      if (ipfs) {
        const newPinset = await ipfs.pin.ls()
        setPinset(newPinset)
        setLoading(false)

        newPinset.map(({ hash }) => {})
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
      {!loading && <div> {JSON.stringify(pinset)}</div>}
    </section>
  )
}
