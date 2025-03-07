import type { PlasmoCSConfig } from "plasmo"

import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/overview"]
}

const createButton = (isHideDescription: boolean) => {
  const button = document.createElement("button")
  const buttonProperties = {
    textContent: isHideDescription ? "▼ show description" : "▲ hide description",
    type: "button"
  }
  const buttonStyles = `
    margin-left: auto;
    border: none;
    background-color: #fff;
    color: #5E6C84;
    cursor: pointer;
  `
  Object.assign(button, buttonProperties)
  button.style.cssText = buttonStyles
  button.classList.add("description-hide-button")

  button.addEventListener("mouseenter", () => {
    button.style.textDecoration = "underline"
  })

  button.addEventListener("mouseleave", () => {
    button.style.textDecoration = "none"
  })

  return button
}

export const hideDescription = async () => {
  await sleep(500)
  const isHideDescription = await getBooleanFromStorage("isHideDescription")
  const description = document.querySelector(
    ".pull-request-description"
  ) as HTMLDivElement

  if (!isHideDescription) {
    const hideButton = document.querySelector(".description-hide-button")
    if (hideButton) hideButton.remove()
    description.style.display = "block"
    return
  }

  description.style.display = "none"
  const hideButton = createButton(isHideDescription)
  const mainPanelRow = document.querySelector(".main-panel-row") as HTMLDivElement
  mainPanelRow.appendChild(hideButton)

  hideButton.addEventListener("click", () => {
    const descriptionDisplay = description.style.display
    // descriptionDisplay === 'none' -> ▲ hide descriptionを表示し、説明を表示状態にする
    hideButton.textContent =
      descriptionDisplay === "none" ? "▲ hide description" : "▼ show description"
    description.style.display = descriptionDisplay === "none" ? "block" : "none"
  })
}

window.onload = hideDescription
