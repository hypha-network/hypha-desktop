import { app } from 'electron'
import fixPath from 'fix-path'

import main from './main'

fixPath()

app.setAppUserModelId('io.hypha.desktop')

if (app.dock) {
  app.dock.hide()
}

if (!app.requestSingleInstanceLock()) {
  process.exit(0)
}

process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)

const context = {}

const run = async () => {
  try {
    await app.whenReady()
  } catch (error) {
    console.log(error)
    app.exit(1)
  }

  try {
    await main(context)
  } catch (error) {
    console.log(error)
  }
}

run()
