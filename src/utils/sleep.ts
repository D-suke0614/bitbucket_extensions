/**
 * ms秒処理をストップさせる
 * @param ms number
 * @returns
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
