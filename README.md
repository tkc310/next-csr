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

## 考察 Memo

CSR 専用(SPA)といいつつ、Next.js で `next build && next export` すると実質 SSG になる。  
`next export` するとローカルで SSG された静的ファイルが出力され、api や isr が有効にならない。  
(vercel などにデプロイした際に serverless function が作成されない)  

従来の SPA とは異なり、page 単位で html を生成するため遷移時は下記のような動きをする。(SSR のように振る舞う)  

1. `xxx.com/posts/` にアクセス
2. `pages/posts/index.html` が返される
3. 以降は非同期の遷移になる

Rails などのモノシリックFWとNext.jsで出力した SPA を組み合わせる場合は、従来のように erb に記載した dom にマウントする形ではなく、controller で SPA のルート URL を提供する形になると思う。  
認証機能を持つサービスの場合は、controller で session の有無を確認してログイン前後のページに振り分ける処理などの処理ができる。  
erb から利用できない以上、helper やテンプレート内でのパラメータ渡しや変数の埋め込みによる出し分けなどの邪法もできない。  

上記を踏まえるとモノシリックFW + SPAの構成で得られる生産性の高さも得られないため、別ドメインに静的ホスティングしてしまった方が、Rails サーバにも優しくてスケールも用意になりコードも責務が別れて綺麗になる。  
クライアントで行いたくない処理(ボリュームのある演算など)が出てきた場合は、service woker か Next.js の api を利用して小さい severless の BFF を作るなどが手段が取れそう。  
