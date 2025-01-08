import type { PlasmoCSConfig } from "plasmo"

import { observe } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/overview"]
}

const createButton = (isHideDescription: boolean) => {
  const button = document.createElement('button')
  const buttonProperties = {
    textContent: isHideDescription ? "▼ show description" : "▲ hide description",
    type: "button"
  }
  const buttonStyles = `
    border: none;
    background-color: #fff;
    color: #5E6C84;
    cursor: pointer;
  `
  Object.assign(button, buttonProperties)
  button.style.cssText = buttonStyles
  button.classList.add('description-hide-button')
  return button
}

// TODO: ボタンで開閉できるようにする
export const hideDescription = async () => {
  await sleep(500)
  const isHideDescription = await getBooleanFromStorage("isHideDescription")
  const description = document.querySelector(
    ".pull-request-description"
  ) as HTMLDivElement

  if (!isHideDescription) {
    const hideButton = document.querySelector('.description-hide-button')
    if (hideButton) hideButton.remove()
      description.style.display = 'block'
      return
  }

  description.style.display = 'none'
  const hideButton = createButton(isHideDescription)
  const mainPanelRow = document.querySelector('.main-panel-row') as HTMLDivElement
  mainPanelRow.appendChild(hideButton)

  hideButton.addEventListener('click', () => {
    const descriptionDisplay = description.style.display
    hideButton.textContent = descriptionDisplay === 'none' ? "▼ show description" : "▲ hide description"
    description.style.display = descriptionDisplay === 'none' ? 'block' : 'none'
  })
}

window.onload = hideDescription
// observe(".pull-request-details", hideDescription)
