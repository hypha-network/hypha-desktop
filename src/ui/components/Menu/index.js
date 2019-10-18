import React, { useContext } from 'react'
import { FileText, GitCommit, Radio, Search } from 'react-feather'

import { PageContext } from '../Context/page'

import css from './style.css'

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
          className={page === 'articles' ? css.active : ''}
          onClick={() => click('articles')}
        >
          <FileText className={css.icon} size={17} />
          Articles
        </li>
        <li
          className={page === 'peers' ? css.active : ''}
          onClick={() => click('peers')}
        >
          <Radio className={css.icon} size={17} />
          Peers
        </li>
        <li
          className={page === 'bootstrap' ? css.active : ''}
          onClick={() => click('bootstrap')}
        >
          <GitCommit className={css.icon} size={17} />
          Bootstrap
        </li>
      </div>
      <div className={css.version}>Version: 0.1.1</div>
    </section>
  )
}
