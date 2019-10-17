import React, { useEffect, useState } from 'react'
import PeerId from 'peer-id'
import { createPeer, createIPFS } from '../../../common/p2p'

export const ChatRoom = () => {
  const [remotePeerId, setRemotePeerId] = useState('')
  const [remotePeerAddr, setRemotePeerAddr] = useState('')
  const [peer, setPeer] = useState(null)
  const [node, setNode] = useState(null)

  // initialize
  useEffect(() => {
    createPeer().then(peer => setPeer(peer))
    createIPFS().then(node => setNode(node))
  }, [])

  // get address from id
  useEffect(() => {
    if (node && remotePeerId) {
      // peer
      //   .getAddrFromId(remotePeerId)
      //   .then(address => setRemotePeerAddr(address))
      const peerId = PeerId.createFromB58String(remotePeerId)
      node.libp2p.peerRouting
        .findPeer(peerId)
        .then((result, error) => console.log({ result, error }))
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
