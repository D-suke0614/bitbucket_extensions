/**
 * 特定の要素を監視し、処理を行う
 * @param target string
 * @param func function
 */
export const observe = (target: string, func: any) => {
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
