export type Styles = {
  main: string
  toggle: string
  "toggle-button": string
  "toggle-label": string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
