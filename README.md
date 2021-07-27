# Next.js で CSR のみを利用するサンプル

## Development Env

| name  | version |
| :---- | :------ |
| node  | 14.17.3 |
| npm   | 6.14.13 |
| next  | 11.0.1  |
| react | 17.0.2  |

## Usage

```
$ npm i

# 開発サーバ起動 (HMR & Live Reload)
$ npm run dev

# /out に静的ファイルをexport
$ npm run build

# outに出力された静的ファイルの静的ホスティング
$ npm run static

# mock api server起動
$ npm run backend

# バンドルファイルのsizeチェックなど
$ npm run analyze
```

## 環境構築時のメモ

- ボイラープレート導入 ~ node,npm バージョン固定

```
$ npx create-next-app --typescript

$ vi .node-version
# 14.17.3

$ vi .npmrc
# engine-strict=true
# save-exact=true

$ vi package.json
# "engines": {
#   "node": "14.17.3",
#   "npm": "6.14.13"
# },
# ...

$ npm i
```

- bundle-analizer 導入

```
$ npm i -D @next/bundle-analyzer

$ vi next.config
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#  enabled: process.env.ANALYZE === 'true',
# });
# const config = {
#  reactStrictMode: true,
# };
# module.exports = withBundleAnalyzer(config);
```

- eslint, prettier, husky 導入
  (Next.js@v11 にはデフォルトで eslint が入っている)

```
# install後に.eslintrc.json, .prettierrc, .vscode/settings.jsonの設定
$ npm i -D @typescript-eslint/{eslint-plugin,parser} eslint-config-prettier eslint-plugin-prettier eslint-import-resolver-typescript eslint-plugin-import

# install後にpackage.jsonにscriptsを追加
# "prettier:quick": "pretty-quick --staged"
$ npm i -D husky prettier-quick
```
