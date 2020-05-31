import classNames from "classnames"
import React from "react"
import { Loader } from "react-feather"

import css from "./style.css"

export const Spinner = ({ sectionClass, containerClass, text, size }) => {
  const defaultSize = 35

  const sectionCss = classNames(css.section, sectionClass)

  const containerCss = classNames(css.container, containerClass)

  return (
    <div className={containerCss}>
      <span className={css.text}>{text || ""}</span>
      <Loader
        className={css.spinner}
        width={size || defaultSize}
        height={size || defaultSize}
      />
    </div>
  )
}
