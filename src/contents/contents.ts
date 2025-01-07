import { hideResolved } from "./hideResolved"
import { protectMergeButton } from "./protectMergeButton"
import { hideDescription } from "./hideDescription"

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req.action) {
    case "HIDE_RESOLVED":
      hideResolved()
      break
    case "PROTECT_MERGE_BUTTON":
      protectMergeButton()
      break
      case "HIDE_DESCRIPTION":
      hideDescription()
      break
  }
})
