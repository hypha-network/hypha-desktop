import makeMenu from './makeMenu'
import makeTray from './makeTray'
import makeUI from './makeUi'
import runDaemon from './runDaemon'
import runSchema from './schema'

export default async context => {
  await runDaemon(context)
  await runSchema(context)
  await makeMenu(context)
  await makeTray(context)
  await makeUI(context)
}
