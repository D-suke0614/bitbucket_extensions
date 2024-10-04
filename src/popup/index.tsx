import styles from "./index.module.scss"

function IndexPopup() {
  console.log("test")
  return (
    <div className={styles.main}>
      <span>resolvedの表示</span>
      <div className={styles.toggle}>
        <input className={styles["toggle-button"]} type="checkbox" />
        <label className={styles["toggle-label"]} htmlFor=""></label>
      </div>
    </div>
  )
}

export default IndexPopup
