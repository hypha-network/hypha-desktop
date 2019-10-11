import Libp2p from 'libp2p'
import TCP from 'libp2p-tcp'
import Multiplex from 'libp2p-mplex'
import SECIO from 'libp2p-secio'
import defaultsDeep from '@nodeutils/defaults-deep'
import KadDHT from 'libp2p-kad-dht'
import Ping from 'libp2p/src/ping'
// import WebRTCStar from 'libp2p-webrtc-star'
import multiaddr from 'multiaddr'
import PeerInfo from 'peer-info'
import PeerId from 'peer-id'

import store from './store'

// const wstar = new WebRTCStar()

const DEFAULT_OPTS = {
  modules: {
    transport: [TCP],
    // discovery: [wstar.discovery],
    connEncryption: [SECIO],
    streamMuxer: [Multiplex],
    dht: KadDHT
  },
  config: {
    dht: {
      enabled: true,
      kBucketSize: 20
    }
  }
}

export class P2PNode extends Libp2p {
  constructor(opts) {
    super(defaultsDeep(opts, DEFAULT_OPTS))
  }

  ping(remotePeerInfo, callback) {
    const p = new Ping(this._switch, remotePeerInfo)
    p.on('ping', time => {
      p.stop() // stop sending pings
      callback(null, time)
    })
    p.on('error', callback)
    p.start()
  }

  pingRemotePeer(remoteAddress) {
    const remoteAddr = multiaddr(remoteAddress)

    // Convert the multiaddress into a PeerInfo object
    const peerId = PeerId.createFromB58String(remoteAddr.getPeerId())
    const remotePeerInfo = new PeerInfo(peerId)
    remotePeerInfo.multiaddrs.add(remoteAddr)

    console.log('pinging remote peer at ', remoteAddr.toString())
    this.ping(remotePeerInfo, (err, time) => {
      if (err) {
        return console.error('error pinging: ', err)
      }
      console.log(`pinged ${remoteAddr.toString()} in ${time}ms`)
    })
  }

  // query dht and get current address
  async getAddrFromId(multihash) {
    const peerId = PeerId.createFromB58String(multihash)
    const result = await this.peerRouting.findPeer(peerId)
    console.log({ result })
    return result
  }
}

export const createPeer = async () => {
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
    const addresses = peer.peerInfo.multiaddrs.toArray()
    // pingRemotePeer(peer)
    console.log('peer started. listening on addresses:')
    addresses.forEach(addr => console.log(addr.toString()))
  })
  return peer
}
