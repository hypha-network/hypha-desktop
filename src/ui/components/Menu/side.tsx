import React, { useContext } from "react"
import { FileText, GitCommit, Radio, Search } from "react-feather"

import { PageContext } from "../Context/page"

import css from "./side.css"

export const SideMenu = () => {
  const pageItems = [
    { name: "Explore", Icon: Search },
    { name: "Articles", Icon: FileText },
    { name: "Peers", Icon: Radio },
    { name: "Bootstrap", Icon: GitCommit },
  ]

  const { page, setPage } = useContext(PageContext)

  const click = (target) => {
    if (target === page) {
      return undefined
    }
    setPage(target)
  }

  const Item = ({ name, Icon }) => {
    const key = name.toLowerCase()
    return (
      <li className={page === key ? css.active : ""} onClick={() => click(key)}>
        <Icon className={css.icon} size={17} />
        {name}
      </li>
    )
  }

  return (
    <section className={css.section}>
      <div className={css.logo}>Hypha</div>
      <div className={css.menu}>
        {pageItems.map(({ name, Icon }, i) => (
          <Item name={name} Icon={Icon} key={i} />
        ))}
      </div>
      <div className={css.version}>Version: 0.1.1</div>
    </section>
  )
}
