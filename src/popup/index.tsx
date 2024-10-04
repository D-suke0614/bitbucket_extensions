import styles from "./index.modules.scss"

function IndexPopup() {
  console.log("test")
  return (
    <div className={styles.main}>
      <form className={styles.form} action="">
        <label htmlFor="">表示</label>
        <input type="checkbox" />
      </form>
    </div>
  )
}

export default IndexPopup
