import Libp2p from 'libp2p'
import TCP from 'libp2p-tcp'
import Multiplex from 'libp2p-mplex'
import SECIO from 'libp2p-secio'
import defaultsDeep from '@nodeutils/defaults-deep'
import Ping from 'libp2p/src/ping'

const DEFAULT_OPTS = {
  modules: {
    transport: [TCP],
    connEncryption: [SECIO],
    streamMuxer: [Multiplex]
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
}
