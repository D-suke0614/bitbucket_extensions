import type { PlasmoCSConfig } from "plasmo"

import { waitForElement } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://stash.sprocket3.systems/projects/*/pull-requests/*/overview"]
}

chrome.runtime.onMessage.addListener(async (req, _sender, _sendResponse) => {
  if (req.action !== "HIDE_DESCRIPTION") return
  await sleep(500)
  await hideDescription()
  return true
})

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

const hideDescription = async () => {
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

waitForElement(".pull-request-description", async () => {
  await hideDescription()
})
