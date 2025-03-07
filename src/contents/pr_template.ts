import type { PlasmoCSConfig } from "plasmo"

import { observe } from "~src/utils/observe"
import { sleep } from "~src/utils/sleep"
import { getBooleanFromStorage } from "~src/utils/storage"
import { template } from "../../consts/pr_template"

export const config: PlasmoCSConfig = {
  // TODO: リンクの判定をもう少し厳格にする
  matches: ["https://stash.sprocket3.systems/projects/SSFC/repos/git-web/pull-requests?create&activeTab=compare-commits-tab&sourceBranch=refs%2Fheads%2Ffeature%2F*"]
}

const getCodeMirrorInstance = () =>  {
  console.log('CodeMirror')
  // CodeMirrorのエディタがどのように構築されているかに依存します。
  // 通常、グローバル変数に保存されていることが多いです。
  // または、特定のクラス名やIDを持つ要素を探索します。

  // 例: グローバル変数にアクセスする場合
  // console.log('CodeMirror', CodeMirror)
  // if (typeof CodeMirror !== 'undefined') {
  //     // すべてのCodeMirrorインスタンスをループして、適切なインスタンスを見つける
  //     const instances = CodeMirror.instances || [];
  //     return instances.length > 0 ? instances[0] : null;  // 最初のインスタンスを返す
  // }

  // // 例: 特定の要素から探す場合
  // const cmElement = document.querySelector('.CodeMirror');
  // return cmElement ? CodeMirror.fromTextArea(cmElement.previousElementSibling) : null;
}

const addTemplate = () => {
  const editorToolbar = document.querySelector<HTMLElement>('.editor-toolbar')
  const button = document.createElement('button')
  const buttonProperties = {
    textContent: 'テンプレート',
    type: 'button'
  }
  button.style.marginRight = '3px'
  Object.assign(button, buttonProperties)
  button.classList.add('css-7uss0q')

  button.addEventListener('click', () => {
    // CodeMirrorの内容を変更
    const codeMirrorElement =  document.querySelector('.CodeMirror')
    console.log('codeMirrorElement', codeMirrorElement)
    const codeMirrorInstance = codeMirrorElement.CodeMirror || window.CodeMirror
    console.log('codeMirrorInstance', codeMirrorInstance)
    console.log('keys', Object.keys(codeMirrorElement))
    if (!codeMirrorInstance) return
    codeMirrorInstance.setValue(template)
  })
  const editorSecondary = document.querySelector('.editor-toolbar-secondary')
  editorToolbar.insertBefore(button, editorSecondary)

  console.log('editorToolbar', editorToolbar )


  // const Editor = document.querySelector<HTMLElement>('.CodeMirror-code')
  //   console.log('Editor', Editor )
  //   Editor.innerHTML = template
}

export const prTemplate = async () => {
  console.log('prprprpr')
  observe('.compare-page', addTemplate)
  // observe('.create-pull-request-form', console.log('observe'))
  // await sleep(1000)
  // const isProtectMergeButton = await getBooleanFromStorage("isProtectMergeButton")
  // const mergeButton = document.querySelector(".merge-button") as HTMLButtonElement

  // if (!isProtectMergeButton) {
  //   mergeButton.disabled = false
  //   return
  // }

  // const reviewers = document.querySelector(".pull-request-reviewers")
  // const isApproved = reviewers
  //   ? !!reviewers.querySelector("span[aria-label='承認済み']")
  //   : false

  // mergeButton.disabled = !isApproved
}

window.onload = prTemplate

const SmpBckInfo = {
  "SmpKsKbn":"",
  "SmpKid":"",
  "021":[
     {
        "shohinCtg":"N020002_theme0_urinushi0",
        "ek3":"",
        "ek2":"",
        "recommendId":"",
        "ek1":"25620",
        "rn3":"",
        "ksKbn":"",
        "sc":"228",
        "rn2":"",
        "ar":"030",
        "rn1":"0005",
        "kissCd":"000045006",
        "sk2":"06",
        "nc":"82186127",
        "sk3":"228",
        "sk1":"13",
        "ta":"13"
     }
  ],
  "SmpSmk":"",
  "SmpSiryoSeikyuId":"",
  "SmpUid":"",
  "011":[
     {
        "shohinCtg":"N010001_theme0_urinushi1",
        "ek3":"",
        "ek2":"",
        "recommendId":"",
        "ek1":"25620",
        "rn3":"",
        "ksKbn":"",
        "sc":"207",
        "rn2":"",
        "ar":"030",
        "rn1":"0005",
        "kissCd":"000045104",
        "sk2":"06",
        "nc":"82199159",
        "sk3":"207",
        "sk1":"13",
        "ta":"13"
     },
     {
        "shohinCtg":"N020001_theme0_urinushi1",
        "ek3":"",
        "ek2":"",
        "recommendId":"",
        "ek1":"14970",
        "rn3":"",
        "ksKbn":"",
        "sc":"102",
        "rn2":"",
        "ar":"030",
        "rn1":"0005",
        "kissCd":"001981002",
        "sk2":"01",
        "nc":"81749700",
        "sk3":"102",
        "sk1":"14",
        "ta":"14"
     }
  ],
  "SmpUUId":"Z2KP2qwcAxoAABuBQSQAAAAg",
  "SmpBs":"021",
  "SmpAr":"030"
}

const  bsCdList = ['010', '011', '020', '021', '030']
const selectedKissCdList = bsCdList
.filter(function(code) {return Array.isArray(SmpBckInfo[code])})
.flatMap(function(code) {
  return SmpBckInfo[code]
  .map(function (item) {return item.kissCd})
})
.filter(function (kissCd){return kissCd});
