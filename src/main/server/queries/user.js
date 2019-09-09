import { ipfs, loadArticle } from '../../../common/ipfs'

export default {
  Query: {
    viewer: async (root, args, context) => {
      const pinset = await ipfs.pin.ls()

      // resolve subcription for local user
      // use pinset as subscriptions for now
      const subscriptionEdges = (await Promise.all(
        pinset.map(async data => {
          try {
            const { hash } = data

            // Parse entry html
            const content = await loadArticle(hash)
            return { cursor: hash, node: { content } }
          } catch (error) {
            console.error(error)
            return null
          }
        })
      )).filter(edge => edge)

      const totalCount = subscriptionEdges.length
      return {
        subscriptions: {
          totalCount,
          pageInfo: {
            startCursor: totalCount ? subscriptionEdges[0].cursor : null,
            endCursor: totalCount
              ? subscriptionEdges[totalCount - 1].cursor
              : null,
            hasNextPage: false,
            hasPreviousPage: false
          },
          edges: subscriptionEdges
        }
      }
    }
  },
  User: {
    subscriptions: root => {
      console.log({ root })
      return root
    }
  }
}
