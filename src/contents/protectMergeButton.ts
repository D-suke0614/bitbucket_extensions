import type { PlasmoCSConfig } from "plasmo"

import { observe } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/"]
}

export const protectMergeButton = async () => {
  await sleep(500)
  const isProtectMergeButton = await getBooleanFromStorage(
    "isProtectMergeButton"
  )
  const mergeButton = document.querySelector(
    ".merge-button"
  ) as HTMLButtonElement

  if (!isProtectMergeButton) {
    mergeButton.disabled = false
    return
  }

  const reviewers = document.querySelector(".pull-request-reviewers")
  const isApproved = reviewers
    ? !!reviewers.querySelector("span[aria-label='承認済み']")
    : false

  mergeButton.disabled = !isApproved
}

observe(".merge-button", protectMergeButton)
