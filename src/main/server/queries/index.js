import { merge } from 'lodash'
// local
import user from './user'
import article from './article'

export default merge(article, user)
