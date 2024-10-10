import type { PlasmoCSConfig } from "plasmo"

import { observe } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: [
    "https://stash.sprocket3.systems/projects/*/pull-requests/*/overview"
  ]
}

chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  if (req.action === "CLICK_BUTTON") {
    const isHideResolved = await getBooleanFromStorage("isHideResolved")
    init()
  }
})

const createButton = (isHideResolved: boolean, isLeftContent: boolean) => {
  const button = document.createElement("button")
  const buttonProperties = {
    textContent: isHideResolved ? "▼ show resolved" : "▼ hide resolved",
    type: "button"
  }
  const buttonStyles = `
    margin-left: ${isLeftContent ? "5px" : "auto"};
    border: none;
    background-color: #fff;
    color: #5E6C84;
    cursor: pointer;
  `
  Object.assign(button, buttonProperties)
  button.style.cssText = buttonStyles
  button.classList.add("displayed-control-button")

  button.addEventListener("mouseenter", () => {
    button.style.textDecoration = "underline"
  })

  button.addEventListener("mouseleave", () => {
    button.style.textDecoration = "none"
  })

  return button
}

const init = async () => {
  console.log("wait 500ms")
  await sleep(500)
  console.log("waited 500ms")

  const isHideResolved = await getBooleanFromStorage("isHideResolved")
  const commentedElements = document.querySelectorAll(".file-comment")
  for (let i = 0; i < commentedElements.length; i++) {
    // トグルがfalseだったらcontinue, もしボタンが追加されていたら削除する
    if (!isHideResolved) {
      const displayedControlButton = commentedElements[i].querySelector(
        ".displayed-control-button"
      )
      if (displayedControlButton) displayedControlButton.remove()
      commentedElements[i].querySelector<HTMLElement>(
        ".file-content"
      ).style.display = "block"
      continue
    }

    // すでに表示切替用ボタンを追加済だったらcontinue
    if (commentedElements[i].querySelector(".displayed-control-button"))
      continue

    // resolvedかの判定に使う要素
    const commentHeader = commentedElements[i].querySelector(".comment-header")
    const resolvedBudge = commentHeader.querySelector(
      "div[role='presentation']"
    )

    if (resolvedBudge) {
      const isOutdatedLozenge =
        !!commentedElements[i].querySelector(".outdated-lozenge")
      // 表示切替用ボタン
      const button = createButton(isHideResolved, isOutdatedLozenge)

      // 省略する要素の取得、初期表示、イベント設定
      const fileContent =
        commentedElements[i].querySelector<HTMLElement>(".file-content")
      fileContent.style.display = isHideResolved ? "none" : "block"
      button.addEventListener("click", () => {
        const defaultTargetDisplay = fileContent.style.display
        button.textContent =
          defaultTargetDisplay === "none"
            ? "▲ hide resolved"
            : "▼ show resolved"
        fileContent.style.display =
          defaultTargetDisplay === "none" ? "block" : "none"
      })

      const fileHeader =
        commentedElements[i].querySelector<HTMLElement>(".file-header")
      fileHeader.appendChild(button)
    }
  }
}

observe(".activities", init)
