import type { PlasmoCSConfig } from "plasmo"

import { waitForElement } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/overview"]
}

chrome.runtime.onMessage.addListener(async (req, _sender, _sendResponse) => {
  if (req.action !== "PROTECT_MERGE_BUTTON") return
  await sleep(500)
  await protectMergeButton()
  return true
})

const protectMergeButton = async () => {
  const isProtectMergeButton = await getBooleanFromStorage("isProtectMergeButton")
  const mergeButton = document.querySelector(".merge-button") as HTMLButtonElement

  if (!mergeButton) return

  if (!isProtectMergeButton) {
    mergeButton.disabled = false
    return
  }

  // レビュワー1人以上から承認されている場合のみマージボタンが活性
  const reviewers = document.querySelector(".pull-request-reviewers")
  const isApproved = reviewers
    ? !![...reviewers.querySelectorAll("span[aria-label='承認済み']")].length
    : false

  mergeButton.disabled = !isApproved
}

waitForElement(".merge-button", async () => {
  await protectMergeButton()
})
