import makeMenu from './makeMenu'
import makeTray from './makeTray'
import makeUI from './makeUi'
import runDaemon from './runDaemon'

export default async context => {
  await runDaemon(context)
  await makeMenu(context)
  await makeTray(context)
  await makeUI(context)
}
