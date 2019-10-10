import React, { useEffect, useState } from 'react'
import multiaddr from 'multiaddr'
import PeerInfo from 'peer-info'
import PeerId from 'peer-id'
import process from 'process'
import store from '../../../../common/store'
import { P2PNode } from './p2p'

function pingRemotePeer(localPeer, remoteAddress) {
  if (!remoteAddress) {
    return console.log('no remote peer address given, skipping ping')
  }
  const remoteAddr = multiaddr(remoteAddress)

  // Convert the multiaddress into a PeerInfo object
  const peerId = PeerId.createFromB58String(remoteAddr.getPeerId())
  const remotePeerInfo = new PeerInfo(peerId)
  remotePeerInfo.multiaddrs.add(remoteAddr)

  console.log('pinging remote peer at ', remoteAddr.toString())
  localPeer.ping(remotePeerInfo, (err, time) => {
    if (err) {
      return console.error('error pinging: ', err)
    }
    console.log(`pinged ${remoteAddr.toString()} in ${time}ms`)
  })
}

function handleStart(peer) {
  // get the list of addresses for our peer now that it's started.
  // there should be one address of the form
  // `/ip4/127.0.0.1/tcp/${assignedPort}/ipfs/${generatedPeerId}`,
  // where `assignedPort` is randomly chosen by the operating system
  // and `generatedPeerId` is generated in the `createPeer` function above.
  const addresses = peer.peerInfo.multiaddrs.toArray()
  // pingRemotePeer(peer)
  console.log('peer started. listening on addresses:')
  addresses.forEach(addr => console.log(addr.toString()))
}

const createPeer = async () => {
  const createPeerInfo = () => {
    return new Promise((resolve, reject) => {
      let PeerId = store.get('PeerId')
      if (PeerId) {
        PeerInfo.create(PeerId, (err, peerInfo) => {
          if (err) {
            reject(err)
          }
          resolve(peerInfo)
        })
      } else {
        PeerInfo.create((err, peerInfo) => {
          if (err) {
            reject(err)
          }
          store.set('PeerId', peerInfo.id)
          resolve(peerInfo)
        })
      }
    })
  }
  const peerInfo = await createPeerInfo()
  // add a listen address to accept TCP connections on a random port
  const listenAddress = multiaddr(`/ip4/127.0.0.1/tcp/0`)
  peerInfo.multiaddrs.add(listenAddress)

  const peer = new P2PNode({ peerInfo })

  // register an event handler for errors.
  // here we're just going to print and re-throw the error
  // to kill the program
  peer.on('error', err => {
    console.error('libp2p error: ', err)
    throw err
  })

  peer.start(err => {
    if (err) {
      throw err
    }
    handleStart(peer)
  })
  return peer
}

export const ChatRoom = () => {
  const [peerAddr, setPeerAddr] = useState('')

  useEffect(() => {
    createPeer().then(peer => pingRemotePeer(peer, peerAddr))
  })

  return (
    <form>
      <input onChange={e => setPeerAddr(e.target.value)} />
    </form>
  )
}
