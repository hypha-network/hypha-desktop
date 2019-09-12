import classNames from 'classnames'
import React, { useContext, useState, useEffect } from 'react'
import { CheckCircle, Download, Loader } from 'react-feather'

import { ipfs } from '../../../common/ipfs'
import { HashContext } from '../Context/hash'

import css from './pin.css'

export const PinButton = () => {
  const { hash, setHash } = useContext(HashContext)

  useEffect(() => {
    ipfs.pin.ls().then(pinset => {
      if (pinset.map(({ hash }) => hash).includes(hash)) {
        setPinState('pinned')
      }
    })
    return setPinState('unpin')
  }, [hash])

  const [pinState, setPinState] = useState('unpin')

  const isUnpin = pinState === 'unpin'

  const isPinning = pinState === 'pinning'

  const isPinned = pinState === 'pinned'

  const buttonCss = classNames(css.button, isPinned ? css.pinned : '')

  const pin = () => {
    if (hash && isUnpin) {
      setPinState('pinning')
      ipfs.pin.add(hash, { recursive: false }, (err, res) => {
        if (err) {
          console.log(err)
        }
        setPinState('pinned')
      })
    }
  }

  return (
    <div className={buttonCss} onClick={pin}>
      {isUnpin && (
        <>
          <Download className={css.pin} size={15} />
          Pin
        </>
      )}
      {isPinning && (
        <>
          <Loader className={css.pin} size={15} />
          Pinning
        </>
      )}
      {isPinned && (
        <>
          <CheckCircle className={css.pin} size={15} />
          Pinned
        </>
      )}
    </div>
  )
}
