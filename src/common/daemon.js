import { execFileSync } from 'child_process'
import { app } from 'electron'
import fs from 'fs-extra'
import IPFSFactory from 'ipfsd-ctl'
import findExecutable from 'ipfsd-ctl/src/utils/find-ipfs-executable'
import { join } from 'path'

const readConfig = path => fs.readJsonSync(path)

const saveConfig = (path, config) =>
  fs.writeJsonSync(path, config, { spaces: 2 })

const resetDaemon = async (addr, path) => {
  if (!fs.existsSync(join(path, 'config'))) {
    throw new Error('Cannot find config')
  }

  const exec = findExecutable('go', app.getAppPath())
  try {
    execFileSync(exec, ['repo', 'fsck'], {
      env: {
        ...process.env,
        IPFS_PATH: path
      }
    })
    console.log('[DAEMON] clean - completed')
  } catch (error) {
    console.log('[DAEMON] ', error)
  }
}

const initDaemon = async ({ type, path, keysize }) => {
  const service = IPFSFactory.create({ type })

  const daemon = await service.spawn({
    disposable: false,
    defaultAddrs: true,
    repoPath: path,
    init: false,
    start: false
  })

  if (daemon.initialized) {
    return daemon
  }

  await daemon.init({
    directory: path,
    keysize
  })

  const configPath = join(daemon.repoPath, 'config')
  const config = readConfig(configPath)
  config.API = { HTTPHeaders: {} }
  config.Swarm = config.Swarm || {}
  config.Swarm.DisableNatPortMap = false
  config.Swarm.ConnMgr = config.Swarm.ConnMgr || {}
  config.Swarm.ConnMgr.GracePeriod = '300s'
  config.Swarm.ConnMgr.LowWater = 50
  config.Swarm.ConnMgr.HighWater = 350
  config.Discovery = config.Discovery || {}
  config.Discovery.MDNS = config.Discovery.MDNS || {}
  config.Discovery.MDNS.enabled = true
  saveConfig(configPath, config)

  return daemon
}

export default async options => {
  const daemon = await initDaemon(options)

  if (!daemon.started) {
    await daemon.start(options.flags)
  }

  try {
    await daemon.api.id()
  } catch (error) {
    if (!error.message.includes('ECONNREFUSED')) {
      throw error
    }
    await resetDaemon(daemon.apiAddr, daemon.repoPath)
    await daemon.start(options.flags)
  }

  return daemon
}
