import type { PlasmoCSConfig } from "plasmo"

import { observe } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/overview"]
}

// TODO: ボタンで開閉できるようにする
export const hideDescription = async () => {
  await sleep(500)
  const isHideDescription = await getBooleanFromStorage("isHideDescription")
  const description = document.querySelector(
    ".pull-request-description"
  ) as HTMLDivElement

  if (isHideDescription) {
    description.style.display = "none"
  } else {
    description.style.display = "block"
  }
}

observe(".main-panel", hideDescription)
