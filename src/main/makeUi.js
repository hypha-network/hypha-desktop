import { app, BrowserWindow, ipcMain, session } from 'electron'
import { join } from 'path'

import { SIZE } from '../common/enum'

// Electron reload shoule be used only in development
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(join(__dirname, '../../assets/ui'))
}

const { WIDTH, HEIGHT } = SIZE

const config = {
  width: WIDTH,
  height: HEIGHT,
  minWidth: WIDTH,
  minHeight: HEIGHT,
  autoHideMenuBar: true,
  fullscreenWindowTitle: true,
  show: false,
  title: 'Hypha',
  titleBarStyle: 'hiddenInset',
  webPreferences: {
    allowRunningInsecureContent: false,
    preload: join(__dirname, 'preloadUi.js'),
    webSecurity: false
  }
}

const initWindow = () => {
  const window = new BrowserWindow(config)

  window.on('close', event => {
    event.preventDefault()
    if (app.dock) {
      app.dock.hide()
    }
    window.hide()
    console.log('[UI] hidden')
  })

  return window
}

export default async context => {
  const window = initWindow(context)
  const uiPath = 'file://' + join(__dirname, '../../assets/ui', 'index.html')
  let apiAddress = null

  context.webui = window

  context.launchUI = () => {
    window.show()
    window.focus()

    if (app.dock) {
      app.dock.show()
    }
  }

  app.on('before-quit', () => {
    window.removeAllListeners('close')
  })

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    delete details.requestHeaders['Origin']
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  })

  return new Promise(resolve => {
    window.loadURL(uiPath)
    window.once('ready-to-show', () => {
      console.log('[UI] started')
      window.show()
      window.focus()

      if (app.dock) {
        app.dock.show()
      }
      resolve()
    })
  })
}
