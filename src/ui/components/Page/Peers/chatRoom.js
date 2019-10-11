import React, { useEffect, useState } from 'react'
import { createPeer } from '../../../../common/p2p'

export const ChatRoom = () => {
  const [remotePeerId, setRemotePeerId] = useState('')
  const [remotePeerAddr, setRemotePeerAddr] = useState('')
  const [peer, setPeer] = useState(null)

  // initialize
  useEffect(() => {
    createPeer().then(peer => setPeer(peer))
  }, [])

  // get address from id
  useEffect(() => {
    if (peer && remotePeerId) {
      peer
        .getAddrFromId(remotePeerId)
        .then(address => setRemotePeerAddr(address))
    }
  }, [remotePeerId])

  // trigger pings
  useEffect(() => {
    if (peer && remotePeerAddr) {
      peer.pingRemotePeer(remotePeerAddr)
    }
  }, [remotePeerAddr])

  return (
    <form style={{ margin: 20, display: 'flex', width: '100%' }}>
      <input
        placeholder="peer id"
        onChange={e => {
          setRemotePeerId(e.target.value)
        }}
      />
      <input
        placeholder="peer address"
        onChange={e => {
          setRemotePeerAddr(e.target.value)
        }}
      />
    </form>
  )
}
