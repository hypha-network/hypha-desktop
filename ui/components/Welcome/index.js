import React from 'react'

import { EMOJIS } from '../../common/enum'

import css from './style.css'

export const Welcome = () => {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]

  return (
    <div className={css.container}>
      <div className={css.emoji}>{emoji}</div>
      <div className={css.text}>
        Thanks for using Hypha!!!
        <br />
        <br />
        Hypha is an Electron app powered by InterPlanetary File System (IPFS).
        The goal of this app is to provide everyone an easier way to discover
        contents stored on IPFS. This app is an open source porject. Feel free to join in.
        <br />
        <br />
        OK, let's explore interesting contents by entering IPFS hash.
      </div>
    </div>
  )
}
