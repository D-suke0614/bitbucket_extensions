import type { PlasmoCSConfig } from "plasmo"

import { observe } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/overview"]
}

const createButton = (isHideResolved: boolean, isLeftContent: boolean) => {
  const button = document.createElement("button")
  button.textContent = isHideResolved ? "▼ show resolved" : "▲ hide resolved"
  button.type = 'button'
  button.style.cssText = `
  margin-left: ${isLeftContent ? "5px" : "auto"};
  border: none;
  background-color: #fff;
  color: #5E6C84;
  cursor: pointer;
  `
  button.classList.add("displayed-control-button")

  button.addEventListener("mouseenter", () => {
    button.style.textDecoration = "underline"
  })

  button.addEventListener("mouseleave", () => {
    button.style.textDecoration = "none"
  })

  return button
}

/**
 * 引数で受け取ったElementが存在していたら`display = 'block'`にする
 */
const showElement = (elements: HTMLElement[]) => {
  elements.forEach(element => {
    if (element) {
      element.style.display = 'block';
    }
  })
}

/**
 * targetElementの`display`の値を元に、button, targetElementを`display = 'none'` or `display = 'block`にする
 */
const toggleElement = (button: HTMLButtonElement, targetElement: HTMLElement) => {
  const defaultDisplay = targetElement.style.display
  button.textContent = defaultDisplay === "none" ? "▲ hide resolved" : "▼ show resolved"
  targetElement.style.display = defaultDisplay === "none" ? "block" : "none"
}

export const hideResolved = async () => {
  await sleep(500)

  const isHideResolved = await getBooleanFromStorage("isHideResolved")
  const commentedActivityElements = document.querySelectorAll(".commented-activity")

  for (let i = 0; i < commentedActivityElements.length; i++) {
    // トグルがfalseだったらcontinue && もしボタンが追加されていたら削除する
    if (!isHideResolved) {
      const displayedControlButton = commentedActivityElements[i].querySelector<HTMLElement>(
        ".displayed-control-button"
      )
      if (displayedControlButton) displayedControlButton.remove()

      const fileContent = commentedActivityElements[i].querySelector<HTMLElement>(".file-content")
      const commentContent = commentedActivityElements[i].querySelector<HTMLElement>('.comment-content')
      const replies = commentedActivityElements[i].querySelector<HTMLElement>('.replies')
      showElement([fileContent, commentContent, replies])
      continue
    }

    // すでに表示切替用ボタンを追加済だったらcontinue
    if (commentedActivityElements[i].querySelector<HTMLElement>(".displayed-control-button")) continue

    // resolvedかの判定に使う要素
    const commentHeader = commentedActivityElements[i].querySelector<HTMLElement>(".comment-header")
    const resolvedBudge = commentHeader.querySelector<HTMLElement>("div[role='presentation']")

    if (resolvedBudge) {
      const isOutdatedLozenge =
        !!commentedActivityElements[i].querySelector(".outdated-lozenge")
      const hideButton = createButton(isHideResolved, isOutdatedLozenge)
      
      // 省略する要素の取得、初期表示、イベント設定
      const fileContent =
      commentedActivityElements[i].querySelector<HTMLElement>(".file-content")
      if (fileContent) {
        // ファイルに対してのコメントがあったとき
        fileContent.style.display = isHideResolved ? "none" : "block"
        hideButton.addEventListener("click", () => {
          toggleElement(hideButton, fileContent)
        })

        const fileHeader =
          commentedActivityElements[i].querySelector<HTMLElement>(".file-header")
        fileHeader.appendChild(hideButton)
      } else {
        // activityエリアに直接コメントがあった時
        const commentContent = commentedActivityElements[i].querySelector<HTMLElement>('.comment-content')
        const replies = commentedActivityElements[i].querySelector<HTMLElement>('.replies')
        commentContent.style.display = isHideResolved ? 'none' : 'block'
        if (replies)replies.style.display = isHideResolved ? 'none' : 'block'
        hideButton.addEventListener("click", () => {
          if (replies)replies.style.display = commentContent.style.display === 'none' ? 'block' : 'none'
          toggleElement(hideButton, commentContent)
        })

        commentHeader.appendChild(hideButton)
      }
    }
  }
}

window.onload = hideResolved
observe(".activities", hideResolved)
