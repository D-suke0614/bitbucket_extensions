import React from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import ToggleButton from '~src/components/ToggleButton/ToggleButton'

function IndexPopup() {
  //TODO: ../utils/storage.tsとまとめたい
  const [isHideResolved, setIsHideResolved] = useStorage(
    'isHideResolved',
    false
  )

  const handleHideResolved = async (isHide: boolean) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    if (!tab.id) return
    chrome.tabs
      .sendMessage(tab.id, { action: 'CLICK_BUTTON' })
      .then(() => {})
      .catch((e) => console.error(e))
    setIsHideResolved(isHide)
  }

  return (
    <div>
      <ToggleButton
        isChecked={isHideResolved}
        handleValue={handleHideResolved}
      />
    </div>
  )
}

export default IndexPopup
