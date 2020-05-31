import React, { useEffect, useState } from 'react'
import { Radio, User } from 'react-feather'

import { ipfs } from '../../../common/ipfs'
import useInterval from '../Hooks/useInterval'
import { Spinner } from '../Spinner'

import css from './peers.css'

const PeersTable = ({ peers }) => {
  const rows = peers.map((peer, index) => (
    <tr key={index}>
      <td style={{ width: '49%' }}>{peer.peer._idB58String}</td>
      <td style={{ width: '51%' }}>{peer.addr.toString('utf8')}</td>
    </tr>
  ))

  return (
    <div className={css.list}>
      <table className={css.head}>
        <thead>
          <tr>
            <td style={{ width: '49%' }}>Peer ID</td>
            <td style={{ width: '51%' }}>Address</td>
          </tr>
        </thead>
      </table>
      <hr className={css.hr} />
      <div className={css.body}>
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  )
}

export const Peers = () => {
  const [loading, setLoading] = useState(true)

  const [peerId, setPeerId] = useState(null)

  const [peers, setPeers] = useState([])

  useEffect(() => {
    if (ipfs) {
      ipfs
        .id()
        .then(identity => setPeerId(identity.id))
        .catch(err => console.log(err))
    }
  }, [])

  useInterval(() => {
    if (ipfs) {
      ipfs.swarm
        .peers()
        .then(peersInfo => setPeers(peersInfo))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
  }, 20000)

  return (
    <section className={css.section}>
      <div className={css.info}>
        <div className={css.id}>
          <User className={css.idIcon} size={16} />
          Peer ID:
          <span className={css.idText}>{peerId}</span>
        </div>
        <div className={css.peers}>
          <Radio className={css.peersIcon} size={16} />
          Connected peers:
          <span className={css.peersText}>{peers.length}</span>
        </div>
      </div>

      {loading && (
        <Spinner
          sectionClass={css.section}
          containerClass={css.spinner}
          size={30}
          text="Peers loading ..."
        />
      )}
      {!loading && <PeersTable peers={peers} />}
    </section>
  )
}
