## Overview

Extensions to improve features that I personally find difficult to use in bitbucket.

個人的にbitbucketで使いにくいと感じた機能を改善するための拡張機能

### current features

- Hide displaying resolved comments
- Block pull request merging without a approvals
- Hide displaying PR summary section

- 解決済みのコメントを省略表示させる
- 承認されていないPRのマージボタンをdisabledにする
- PR概要部分を省略表示させる

## Getting Started

First, run the development server:

```bash
$ pnpm install
$ pnpm dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

## Making production build

Run the following:

```bash
$ pnpm build
```

If you want to zip the file, run the following:

```bash
$ pnpm package
```
