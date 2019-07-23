import { app, ipcMain } from 'electron'
import fs from 'fs-extra'
import { join } from 'path'

import createIpfsDaemon from '../common/daemon'
import store from '../common/store'

export default async (context) => {

  let daemon = null
  let online = null

  context.getDaemon = async () => daemon

  const start = async () => {
    if (daemon) {
      return undefined
    }

    const config = store.get('ipfsConfig')
    try {
      daemon = await createIpfsDaemon(config)
      if (!config.path) {
        config.path = daemon.repoPath
        store.set('ipfsConfig', config)
      }
      console.log('[IPFS] started')
    } catch (error) {
      console.log('[IPFS]', error)
    }
  }

  const stop = async () => {
    if (!daemon) {
      return undefined
    }

    if (!fs.existsSync(join(daemon.repoPath, 'config'))) {
      daemon = null
      return undefined
    }

    return new Promise(resolve => {
      const ipfsDaemon = daemon
      daemon = null
      ipfsDaemon.stop(180, error => {
        if (error) {
          console.log('[IPFS] ', error)
          return resolve(error)
        }
        console.log('[IPFS] stopped')
        resolve()
      })
    })
  }

  const restart = async () => {
    await stop()
    await start()
  }

  ipcMain.on('stopIpfs', stop)
  ipcMain.on('startIpfs', start)
  ipcMain.on('restartIpfs', restart)
  ipcMain.on('ipfsConfigChanged', restart)
  app.on('before-quit', stop)

  await start()

  ipcMain.on('online-status-changed', (_, isOnline) => {
    if (online === false && daemon && isOnline) {
      restart()
    }
    online = isOnline
  })
}
