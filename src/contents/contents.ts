import type { PlasmoCSConfig } from "~node_modules/plasmo/dist/type"

import { hideDescription } from "./hideDescription"
import { hideResolved } from "./hideResolved"
import { protectMergeButton } from "./protectMergeButton"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/"]
}

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
