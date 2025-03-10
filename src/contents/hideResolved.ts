import type { PlasmoCSConfig } from "plasmo"

import { observe } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/overview"]
}

const createButton = (isHideResolved: boolean, isLeftContent: boolean) => {
  const button = document.createElement("button")
  const buttonProperties = {
    textContent: isHideResolved ? "▼ show resolved" : "▲ hide resolved",
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

export const hideResolved = async () => {
  await sleep(500)

  const isHideResolved = await getBooleanFromStorage("isHideResolved")
  const commentedActivityElements = document.querySelectorAll(".commented-activity")
  for (let i = 0; i < commentedActivityElements.length; i++) {
    // トグルがfalseだったらcontinue, もしボタンが追加されていたら削除する
    if (!isHideResolved) {
      const displayedControlButton = commentedActivityElements[i].querySelector(
        ".displayed-control-button"
      )
      if (displayedControlButton) displayedControlButton.remove()
      commentedActivityElements[i].querySelector<HTMLElement>(
        ".file-content"
      ).style.display = "block"
      continue
    }

    // すでに表示切替用ボタンを追加済だったらcontinue
    if (commentedActivityElements[i].querySelector(".displayed-control-button")) continue

    // resolvedかの判定に使う要素
    const commentHeader = commentedActivityElements[i].querySelector(".comment-header")
    const resolvedBudge = commentHeader.querySelector("div[role='presentation']")

    if (resolvedBudge) {
      const isOutdatedLozenge =
        !!commentedActivityElements[i].querySelector(".outdated-lozenge")
      // 表示切替用ボタン
      const button = createButton(isHideResolved, isOutdatedLozenge)
      
      // 省略する要素の取得、初期表示、イベント設定
      const fileContent =
      commentedActivityElements[i].querySelector<HTMLElement>(".file-content")
      if (fileContent) {
        // ファイルに対してのコメントがあったとき
        fileContent.style.display = isHideResolved ? "none" : "block"
        button.addEventListener("click", () => {
          const defaultTargetDisplay = fileContent.style.display
          button.textContent =
            defaultTargetDisplay === "none" ? "▲ hide resolved" : "▼ show resolved"
          fileContent.style.display =
            defaultTargetDisplay === "none" ? "block" : "none"
        })

        const fileHeader =
          commentedActivityElements[i].querySelector<HTMLElement>(".file-header")
        fileHeader.appendChild(button)
      } else {
        // activityエリアに直接コメントがあった時
        const commentContent = commentedActivityElements[i].querySelector<HTMLElement>('.comment-content')
        const replies = commentedActivityElements[i].querySelector<HTMLElement>('.replies')
        commentContent.style.display = isHideResolved ? 'none' : 'block'
        if (replies)replies.style.display = isHideResolved ? 'none' : 'block'
        button.addEventListener("click", () => {
          const defaultTargetDisplay = commentContent.style.display
          button.textContent =
            defaultTargetDisplay === "none" ? "▲ hide resolved" : "▼ show resolved"
          commentContent.style.display =
            defaultTargetDisplay === "none" ? "block" : "none"
          if (replies)replies.style.display = defaultTargetDisplay === 'none' ? 'block' : 'none'
        })

        const commentHeader = commentedActivityElements[i].querySelector<HTMLElement>('.comment-header')
        commentHeader.appendChild(button)
      }
    }
  }
}

window.onload = hideResolved
observe(".activities", hideResolved)
