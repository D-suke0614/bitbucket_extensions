import type { PlasmoCSConfig } from "plasmo";
import { sleep } from "~src/utils/sleep";

export const config: PlasmoCSConfig = {
  matches: ['https://stash.sprocket3.systems/projects/*/pull-requests/*/overview']
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === 'CLICK_BUTTON') {
    const isHideResolved = req.isHide
    main(isHideResolved)
  }
})

const main = async (isHideResolved: boolean) => {
  console.log(isHideResolved)
  console.log('wait in 500ms')
  await sleep(500)
  console.log('target element', document.querySelectorAll('.file-comment'))

  const commentedElements = document.querySelectorAll('.file-comment')
  for (let i = 0; i < commentedElements.length; i++) {
    // resolvedかの判定に使う要素
    const commentHeader = commentedElements[i].querySelector('.comment-header')
    const resolvedBudge = commentHeader.querySelector("div[role='presentation']")
    console.log('resolvedBudge', resolvedBudge)

    if (resolvedBudge) {
      // 表示切替用ボタン
      const fileHeader = commentedElements[i].querySelector<HTMLElement>('.file-header')
      console.log('header', fileHeader)
      const button = document.createElement('button')
      const buttonProperties = {
        type: 'button',
        textContent: '▼ hide resolved'
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
  
      button.addEventListener('mouseenter', () => {
        button.style.textDecoration = 'underline'
      })
  
      button.addEventListener('mouseleave', () => {
        button.style.textDecoration = 'none'
      })
  
      // 省略する要素
      // TODO: isHideResolvedの値に応じて要素を取得した段階で、display: block or none;を設定しておく
      const fileContent = commentedElements[i].querySelector<HTMLElement>('.file-content')
      console.log('fileContent', fileContent)
      button.addEventListener('click', () => {
        console.log(fileContent.style.display)
        const defaultTargetDisplay = fileContent.style.display
        button.textContent = defaultTargetDisplay === 'none' ? '▲ hide resolved' : '▼ show resolved'
        fileContent.style.display = defaultTargetDisplay ==='none' ? 'block' : 'none'
      })
  
      fileHeader.appendChild(button)
    }
  }
}

// 仮置き
main(true)
