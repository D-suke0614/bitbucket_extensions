import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import ToggleButton from "~src/components/ToggleButton/ToggleButton"

function IndexPopup() {
  //TODO: ../utils/storage.tsとまとめたい
  const [isHideResolved, setIsHideResolved] = useStorage(
    "isHideResolved",
    false
  )

  const [isHighlightWords, setIsHighlightWords] = useStorage(
    "isHighlightWords",
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

  const handleHighlightWords = async (isHighlight: boolean) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    if (!tab.id) return
    chrome.tabs
      .sendMessage(tab.id, { action: "HIGHLIGHT_WORDS" })
      .then(() => {})
      .catch((e) => console.error(e))
    setIsHighlightWords(isHighlight)
  }

  return (
    <div>
      <ToggleButton
        isChecked={isHideResolved}
        handleValue={handleHideResolved}
        text={"hide resolved"}
      />
      <ToggleButton
        isChecked={isHighlightWords}
        handleValue={handleHighlightWords}
        text={"highlight words"}
      />
    </div>
  )
}

export default IndexPopup
