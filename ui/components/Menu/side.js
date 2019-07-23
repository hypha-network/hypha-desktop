import React, { useContext } from 'react'
import { Archive, Radio, Search } from 'react-feather'

import { PageContext } from '../Context/page'

import css from './side.css'

export const SideMenu = () => {
  const { page, setPage } = useContext(PageContext)

  const click = target => {
    if (target === page) {
      return undefined
    }
    setPage(target)
  }

  return (
    <section className={css.section}>
      <div className={css.logo}>Hypha</div>
      <div className={css.menu}>
        <li
          className={page === 'explore' ? css.active : ''}
          onClick={() => click('explore')}
        >
          <Search className={css.icon} size={17} />
          Explore
        </li>
        <li
          className={page === 'files' ? css.active : ''}
          onClick={() => click('files')}
        >
          <Archive className={css.icon} size={17} />
          Files
        </li>
        <li
          className={page === 'peers' ? css.active : ''}
          onClick={() => click('peers')}
        >
          <Radio className={css.icon} size={17} />
          Peers
        </li>
      </div>
      <div className={css.version}>Version: 0.1.0</div>
    </section>
  )
}
