import { observe } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const protectMergeButton = async () => {
  await sleep(500)
  const isProtectMergeButton = await getBooleanFromStorage("isProtectMergeButton")
  const mergeButton = document.querySelector(".merge-button") as HTMLButtonElement

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

window.onload = protectMergeButton
observe(".merge-button", protectMergeButton)
