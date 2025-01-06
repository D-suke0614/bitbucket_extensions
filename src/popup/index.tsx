import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import ToggleButton from "~src/components/ToggleButton/ToggleButton"

function IndexPopup() {
  //TODO: ../utils/storage.tsとまとめたい
  const [isHideResolved, setIsHideResolved] = useStorage(
    "isHideResolved",
    false
  )

  const [isProtectMergeButton, setIsProtectMergeButton] = useStorage(
    "isProtectMergeButton",
    false
  )

  const handleHideResolved = async (isHide: boolean) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    if (!tab.id) return
    chrome.tabs
      .sendMessage(tab.id, { action: "HIDE_RESOLVED" })
      .then(() => {})
      .catch((e) => console.error(e))
    setIsHideResolved(isHide)
  }

  const handleProtectMergeButton = async (isProtect: boolean) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    if (!tab.id) return
    chrome.tabs
      .sendMessage(tab.id, { action: "PROTECT_MERGE_BUTTON" })
      .then(() => {})
      .catch((e) => console.error(e))
    setIsProtectMergeButton(isProtect)
  }

  return (
    <div>
      <ToggleButton
        isChecked={isHideResolved}
        handleValue={handleHideResolved}
        text={"hide resolved"}
      />
      <ToggleButton
        isChecked={isProtectMergeButton}
        handleValue={handleProtectMergeButton}
        text={"Protect Merge Button"}
      />
    </div>
  )
}

export default IndexPopup
