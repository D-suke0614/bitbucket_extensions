/**
 * 特定の要素を監視し、処理を行う
 * @param target string
 * @param func function
 */
export const observeElementChanges = (target: string, func: any) => {
  const targetEl = document.querySelector<HTMLElement>(target)

  if (!targetEl) return

  // オブザーバーの作成
  const observer = new MutationObserver((_) => {
    func()
  })

  // 監視の開始
  observer.observe(targetEl, {
    childList: true
  })
}

/**
 * 特定の要素がDOMに追加されるのを待ち、その要素が見つかったら処理を行う
 * @param selector string
 * @param callback () => Promise<void>
 */
export const waitForElement = (selector: string, callback: () => Promise<void>) => {
  const observer = new MutationObserver(async (_mutations) => {
    const element = document.querySelector(selector)
    if (element) {
      observer.disconnect() // 要素が見つかったら監視を停止
      await callback() // 要素が見つかったのでコールバック関数を実行
    }
  })

  // DOMを監視
  observer.observe(document, {
    childList: true,
    subtree: true
  })
}
