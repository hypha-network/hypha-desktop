import React, { useContext } from 'react'

import { PageContext } from '../components'
import { Articles } from './articles'
import { Bootstrap } from './bootstrap'
import { Explore } from './explore'
import { Peers } from './Peers'

export const Page = () => {
  console.log({ PageContext })
  const { page } = useContext(PageContext)

  switch (page) {
    case 'explore':
      return <Explore />
    case 'articles':
      return <Articles />
    case 'peers':
      return <Peers />
    case 'bootstrap':
      return <Bootstrap />
  }
  return <Explore />
}
