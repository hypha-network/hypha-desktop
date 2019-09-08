import { ipfs } from '../../../common/ipfs'

export default {
  Query: {
    viewer: async (root, args, context) => {
      const pinset = await ipfs.pin.ls()

      // use pinset as subscriptions for now
      return {
        subscriptions: pinset
      }
    }
  }
  // subscriptions: root => {
  //   console.log({ root })
  //   return root
  // }
}
