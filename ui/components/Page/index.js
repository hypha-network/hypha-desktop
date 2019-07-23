import React, { useContext } from 'react'

import { PageContext } from '../Context/page'
import { Explore } from './explore'
import { Files } from './files'
import { Peers } from './peers'

export const Page = () => {
  const { page } = useContext(PageContext)

  switch (page) {
    case 'explore':
      return <Explore />
    case 'files':
      return <Files />
    case 'peers':
      return <Peers />
  }
  return <Explore />
}
