import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import ToggleButton from "~src/components/ToggleButton/ToggleButton"

const useToggleOptions = () => {
  const [isHideResolved, setIsHideResolved] = useStorage("isHideResolved", false)
  const [isProtectMergeButton, setIsProtectMergeButton] = useStorage(
    "isProtectMergeButton",
    false
  )
  const [isHideDescription, setIsHideDescription] = useStorage(
    "isHideDescription",
    false
  )

  return [
    {
      key: "isHideResolved",
      label: "hide resolved",
      value: isHideResolved,
      setter: setIsHideResolved,
      action: "HIDE_RESOLVED"
    },
    {
      key: "isProtectMergeButton",
      label: "Protect Merge Button",
      value: isProtectMergeButton,
      setter: setIsProtectMergeButton,
      action: "PROTECT_MERGE_BUTTON"
    },
    {
      key: "isHideDescription",
      label: "Hide Description",
      value: isHideDescription,
      setter: setIsHideDescription,
      action: "HIDE_DESCRIPTION"
    }
  ]
}

const sendMessageToContentScript = async (action: string) => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    if (tab?.id) {
      await chrome.tabs.sendMessage(tab.id, { action })
    }
  } catch (e) {}
}

function IndexPopup() {
  const toggleOptions = useToggleOptions()

  const handleToggle =
    (action: string, setter: (v: boolean) => void) => async (checked: boolean) => {
      await sendMessageToContentScript(action)
      setter(checked)
    }

  return (
    <div>
      {toggleOptions.map(({ key, label, value, setter, action }) => (
        <ToggleButton
          key={key}
          isChecked={value}
          handleValue={handleToggle(action, setter)}>
          {label}
        </ToggleButton>
      ))}
    </div>
  )
}

export default IndexPopup
