import React, { type ReactNode } from "react"

import styles from "./ToggleButton.module.scss"

type Props = {
  children: ReactNode
  isChecked: boolean
  handleValue: (checked: boolean) => void
}

const ToggleButton = ({ children, isChecked, handleValue }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleValue(e.target.checked)
  }

  return (
    <div className={styles.toggle}>
      <span className={styles["toggle__label"]}>{children}</span>
      <div className={styles["toggle__button-area"]}>
        <input
          className={styles["toggle__button-input"]}
          type="checkbox"
          onChange={handleChange}
          checked={isChecked}
        />
        <label className={styles["toggle__button-label"]}></label>
      </div>
    </div>
  )
}

export default ToggleButton
