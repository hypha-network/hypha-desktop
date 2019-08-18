import { app, ipcMain, Menu, Tray } from 'electron'
import { join } from 'path'
import os from 'os'

import { PLATFORM } from '../common/enum'

import { version } from '../../package.json'

const icon = join(__dirname, '../../assets/icons/tray/icon.png')

export default (context) => {
  const items = [
    {
      label: `Hypha (${version})`,
      click: () => { context.launchUI() }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => { app.quit() }
    }
  ]
  const menu = Menu.buildFromTemplate(items)

  const tray = new Tray(icon)
  tray.setContextMenu(menu)

  if (os.platform() !== PLATFORM.MAC) {
    tray.on('click', event => {
      event.preventDefault()
      tray.popUpContextMenu()
    })
  }

  context.tray = tray

  console.log('[TRAY] started')
}
