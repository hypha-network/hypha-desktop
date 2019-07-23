import makeMenu from './makeMenu'
import makeTray from './makeTray'
import makeUI from './makeUi'
import runDaemon from './runDaemon'

export default async (context) => {
  await makeMenu(context)
  await makeUI(context)
  await makeTray(context)
  await runDaemon(context)
  await context.launchUI()
}
