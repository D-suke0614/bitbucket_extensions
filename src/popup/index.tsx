import React, { useEffect, useState } from "react"

import ToggleButton from "~src/components/ToggleButton/ToggleButton"

function IndexPopup() {
  const [hideResolved, setHideResolved] = useState<boolean>(true)

  // TODO: 前回の値を保存しておいて、画面を開いたタイミングで1回content_scripts側に渡せるようにする（値がなければ固定値を渡す）
  // use plasmo storage
  useEffect(() => {}, [])

  const handleHideResolved = async (isHide: boolean) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    if (!tab.id) return
    chrome.tabs
      .sendMessage(tab.id, { action: "CLICK_BUTTON", isHide })
      .then(() => {})
      .catch((e) => console.error(e))
    setHideResolved(isHide)
  }

  return (
    <div>
      <ToggleButton isChecked={hideResolved} handleValue={handleHideResolved} />
    </div>
  )
}

export default IndexPopup
