import type { PlasmoCSConfig } from "plasmo";
import { sleep } from "~src/utils/sleep";
import { setStorage, getBooleanFromStorage } from "~src/utils/storage";

export const config: PlasmoCSConfig = {
  matches: ['https://stash.sprocket3.systems/projects/*/pull-requests/*/overview']
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === 'CLICK_BUTTON') {
    const isHideResolved = req.isHide
    // main(isHideResolved)
  }
})

const createButton = (isHideResolved: boolean) => {
  const button = document.createElement('button')
  const buttonProperties = {
    textContent: isHideResolved ? '▼ show resolved' : '▼ hide resolved',
    type: 'button'
  }
  const buttonStyles = `
    margin-left: 5px;
    border: none;
    background-color: #fff;
    color: #5E6C84;
    cursor: pointer;
  `
  Object.assign(button, buttonProperties)
  button.style.cssText = buttonStyles
  button.classList.add('displayed-control-button')

  button.addEventListener('mouseenter', () => {
    button.style.textDecoration = 'underline'
  })

  button.addEventListener('mouseleave', () => {
    button.style.textDecoration = 'none'
  })

  return button
}

const init = async () => {
  console.log('wait in 500ms')
  await sleep(500)
  console.log('target element list', document.querySelectorAll('.file-comment'))
  const isHideResolved = await getBooleanFromStorage('isHideResolved')

  const commentedElements = document.querySelectorAll('.file-comment')
  for (let i = 0; i < commentedElements.length; i++) {
    // すでに表示切替用ボタンを追加済だったらreturn
    if (commentedElements[i].querySelector('.displayed-control-button')) return

    // resolvedかの判定に使う要素
    const commentHeader = commentedElements[i].querySelector('.comment-header')
    const resolvedBudge = commentHeader.querySelector("div[role='presentation']")
    console.log('resolvedBudge', resolvedBudge)

    if (resolvedBudge) {
      // 表示切替用ボタン
      const button = createButton(isHideResolved)
  
      // 省略する要素の取得、初期表示、イベント設定
      const fileContent = commentedElements[i].querySelector<HTMLElement>('.file-content')
      fileContent.style.display = isHideResolved ? 'none' : 'block'
      button.addEventListener('click', () => {
        const defaultTargetDisplay = fileContent.style.display
        button.textContent = defaultTargetDisplay === 'none' ? '▲ hide resolved' : '▼ show resolved'
        fileContent.style.display = defaultTargetDisplay ==='none' ? 'block' : 'none'
      })

      const fileHeader = commentedElements[i].querySelector<HTMLElement>('.file-header')
      fileHeader.appendChild(button)
    }
  }
}

// 仮置き
init()
