import type { PlasmoCSConfig } from "plasmo"
import { blob } from "stream/consumers"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"

export const config: PlasmoCSConfig = {
  matches: [
    'https://stash.sprocket3.systems/projects/*/browse/*'
    ]
}

chrome.runtime.onMessage.addListener(async (req, sender, sendMessage) => {
  if (req.action === 'HIGHLIGHT_WORDS') {
      console.log("wait 500ms")
      await sleep(500)
      console.log("waited 500ms")

      const isHighlightWords = await getBooleanFromStorage("isHighlightWords")
      console.log('isHighlightWords', isHighlightWords)
      const codeArea = document.querySelector('.page-panel-content-header')
      // const codeArea = document.querySelector('.CodeMirror-scroll')
      codeArea.addEventListener('dblclick', (e) => {
        const selection = window.getSelection()
        const selectedText = selection.toString()
        if (selectedText) {
          highlightWords(selectedText)
        }
      })
  }
})

const highlightWords = (word: string) => {
  console.log('word', word)
  const regex = new RegExp(`\\b${word}\\b`, 'g')
  const codeBlocks = document.querySelectorAll('pre, code')
  console.log('codeBlocks', codeBlocks)

  codeBlocks.forEach((code) => {
    const innerHtml = code.innerHTML
    code.innerHTML = innerHtml.replace(regex, `<span style="background-color: yellow;">${word}</span>`)
  })
}
