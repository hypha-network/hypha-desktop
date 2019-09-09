import makeMenu from './makeMenu'
import makeTray from './makeTray'
import makeUI from './makeUi'
import runDaemon from './runDaemon'
import runServer from './server'

export default async context => {
  await runDaemon(context)
  await runServer(context)
  await makeMenu(context)
  await makeTray(context)
  await makeUI(context)
}
