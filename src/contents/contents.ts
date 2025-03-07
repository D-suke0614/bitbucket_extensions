import { hideDescription } from "./hideDescription"
import { hideResolved } from "./hideResolved"
import { protectMergeButton } from "./protectMergeButton"

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
    case "PR_TEMPLATE":
      break
  }
})
