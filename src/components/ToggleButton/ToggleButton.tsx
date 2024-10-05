import React from "react"

import styles from "./ToggleButton.module.scss"

const ToggleButton = () => {
  return (
    <div className={styles.toggle}>
      <span className={styles["toggle__label"]}>resolvedを省略</span>
      <div className={styles["toggle__button-area"]}>
        <input className={styles["toggle__button-input"]} type="checkbox" />
        <label className={styles["toggle__button-label"]}></label>
      </div>
    </div>
  )
}

export default ToggleButton
