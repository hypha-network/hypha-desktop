import isIpfs from 'is-ipfs'
import trim from 'lodash/trim'
import React, { useContext, useState } from 'react'
import { Box, Radio } from 'react-feather'

import { ipfs } from '../../common/ipfs'
import { HashContext } from '../Context/hash'
import useInterval from '../Hooks/useInterval'

import css from './hash.css'

export const HashBar = () => {
  const { hash, setHash } = useContext(HashContext)

  const [lastHash, setLastHash] = useState('')

  const [peers, setPeers] = useState(0)

  const submit = event => {
    event.preventDefault()
    const currentHash = trim(lastHash)
    setHash(isIpfs.cid(currentHash) ? currentHash : '')
    setLastHash('')
  }

  useInterval(() => {
    if (ipfs) {
      ipfs.swarm
        .peers()
        .then(peersInfo => {
          setPeers(peersInfo.length || 0)
        })
        .catch(error => console.log(error))
    }
  }, 20000)

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={submit}>
        <input
          type="search"
          className={css.hash}
          placeholder="Enter IPFS Hash"
          value={lastHash}
          onChange={event => setLastHash(event.target.value || '')}
        />
        <span className={css.info}>
          <Box className={css.iconHash} size={15} />
          {hash || 'Hash has not been set'}
          <Radio className={css.iconPeer} size={15} />
          {peers} peers
        </span>
      </form>
    </div>
  )
}
