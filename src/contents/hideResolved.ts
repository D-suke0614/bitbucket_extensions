import type { PlasmoCSConfig } from "plasmo";
import { sleep } from "~src/utils/sleep";

export const config: PlasmoCSConfig = {
  matches: ['https://stash.sprocket3.systems/projects/*/pull-requests/*/overview']
}

const main = async () => {
  console.log('wait in 500ms')
  await sleep(500)
  console.log('target element', document.querySelectorAll('.file-comment'))
}

main()
