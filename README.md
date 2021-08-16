# Next.js で CSR のみを利用するサンプル

## Development Env

| name  | version |
| :---- | :------ |
| node  | 14.17.3 |
| npm   | 6.14.13 |
| next  | 11.0.1  |
| react | 17.0.2  |

## Introduction

```bash
# frontend/,backend/ディレクトリ作成
$ mkdir -p app/{frontend,backend}

# 各プロジェクトのクローン
$ git clone git@github.com:tkc310/next-csr.git frontend
$ git clone git@github.com:tkc310/django_graphql.git backend
```

### frontend Introduction

```bash
$ cd frontend

# anyenv install
$ git clone https://github.com/anyenv/anyenv ~/.anyenv
$ echo 'export PATH="$HOME/.anyenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(anyenv init -)"' >> ~/.bash_profile
$ source ~/.bash_profile
$ git clone https://github.com/znz/anyenv-update.git ~/.anyenv/plugins/anyenv-update
$ git clone https://github.com/znz/anyenv-git.git ~/.anyenv/plugins/anyenv-git

# nodenv install
$ anyenv install nodenv

# node install
$ nodenv install 14.17.3
$ nodenv rehash

# husky setting
$ touch ~/.huskyrc
$ echo 'export PATH="$HOME/.anyenv/bin:$PATH"' >> ~/.huskyrc
$ echo 'eval "$(anyenv init -)"' >> ~/.huskyrc

# npm packages install
$ npm i
```

### backend Introduction (Django API サーバ)

```bash
$ cd backend

$ pip install --dev
$ python3 manage.py migrate

# 管理画面用ユーザを作成、データを追加できるようにしておく
$ python3 manage.py createsuperuser
open http://localhost:3001/admin
```

## Usage

### frontend Usage

```bash
# 開発サーバ起動 (HMR & Live Reload)
$ npm run dev

# /out に静的ファイルをexport
$ npm run export

# outに出力された静的ファイルの静的ホスティング
$ npm run serve

# mock api server起動 (後述のDjango APIサーバも利用可能)
$ npm run backend

# バンドルファイルのsizeチェックなど
$ npm run analyze
```

### backend Usage

```bash
# 開発サーバ起動
$ python3 manage.py runserver 3001
$ open open http://localhost:3001/graphql
```

## 環境構築時のメモ

- ボイラープレート導入 ~ node,npm バージョン固定

```bash
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

```bash
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

```bash
# install後に.eslintrc.json, .prettierrc, .vscode/settings.jsonの設定
$ npm i -D @typescript-eslint/{eslint-plugin,parser} eslint-config-prettier eslint-plugin-prettier eslint-import-resolver-typescript eslint-plugin-import

# install後にpackage.jsonにscriptsを追加, prepare.js, lint-staged.config.js追加
$ npm i -D husky lint-staged prettier
# husky初期化後に.husky/pre-commitを修正
$ npx husky-init && npm i && npm run prepare
```

- graphql-codegen, applo client 導入

```bash
# install後にcodegen.ymlの追加、package.jsonのscriptsを追加
npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo get-graphql-schema

# @see https://zenn.dev/kei178/articles/8c6ad6fd91c9de
npm i -S @apollo/client graphql

# APIサーバのGraphiQL / GraphQL Playgroundからschema.graphqlを出力
$ npm run sync_schema

# APIサーバ側でschema.jsonを出力してもOK (Djangoの例)
$ python3 manage.py graphql_schema --schema django_graphql.schema.schema --out schema.graphql

# schema.graphqlからclientで利用するgraphql/index.tsを出力
$ npm run codegen
```

- storybook導入  

```bash
# @see <https://zenn.dev/renshimosawa/articles/2ebcc7f2389d28#4.-storybook-%E5%B0%8E%E5%85%A5>
$ npx sb init (自動的に--type reactになる)
# storybook@6.3.7でsassを利用できるようにする依存パッケージ
$ npm i -D css-loader@5.2.7 sass-loader@10.1.1 style-loader@2.0.0
# node-sassを入れたのでsass(dart)は削除
$ npm un sass
# サンプル削除
$ rm -rf src/stories
# .storybook/main.js, preview.jsを修正
```

- テスト

```bash
# @see <https://tech.gaogao.asia/next-snapshot-test/>
# unitテスト、スナップショットテスト、モック関連
# jest, next-page-tester, testing-library, msw
$ npm i -D jest @types/jest jest-dom ts-jest babel-jest next-page-tester msw @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/dom react-test-renderer @types/react-test-renderer identity-obj-proxy

```

## 考察 Memo

### モノリシック FW との関係性について

CSR 専用(SPA)といいつつ、Next.js で `next build && next export` すると実質 SSG になる。  
`next export` するとローカルで SSG された静的ファイルが出力され、api や isr が有効にならない。  
(vercel などにデプロイした際に serverless function が作成されない)  

従来の SPA とは異なり、page 単位で html を生成するため遷移時は下記のような動きをする。(SSR のように振る舞う)  

1. `xxx.com/posts` にアクセス  
2. `pages/posts/index.html` が返される  
3. 以降は非同期の遷移になる  

Rails などのモノシリック FW と Next.js で出力した SPA を組み合わせる場合は、従来のように erb に記載した dom にマウントする形ではなく、controller で SPA のルート URL を提供する形になると思う。  
認証機能を持つサービスの場合は、controller で session の有無を確認してログイン前後のページに振り分ける処理などの処理ができる。  
erb から利用できない以上、helper やテンプレート内でのパラメータ渡しや変数の埋め込みによる出し分けなどの邪法もできない。  

上記を踏まえるとモノシリック FW + SPA の構成で得られる生産性の高さも得られないため、別ドメインに静的ホスティングしてしまった方が、Rails サーバにも優しくてスケールも用意になりコードも責務が別れて綺麗になる。  
クライアントで行いたくない処理(ボリュームのある演算など)が出てきた場合は、service woker か Next.js の api を利用して小さい severless の BFF を作るなどが手段が取れそう。  

### Next.js のルーティングについて

Next.js のルーティングは `pages/` に配置したファイル構成によって決まるファイルシステムを利用した方法を提供している。  
また、上述したように `next export` した際に page 単位で html を生成する。  

CSR のみで利用する場合に `pages/posts/[post_id].tsx` のようなファイルを配置すると `[post_id].html` が出力され、ルーティングの挙動自体は SSR のように振る舞ってくれる。  
SSG の場合は `getStaticPashs` の `fallback` オプションによって、html の再生性タイミングが決まるが、`getStaticPashs` を定義しない場合(フル CSR)は下記のようにビルド時に実行された html が出力される。  

- `out/posts/[post_id].html`

```html
<div id="__next"><div>Loading</div></div>
```

- `pages/posts/[post_id].tsx` (ビルド元のコード)

```tsx
const { data, loading, error } = usePostByQuery({
  variables: { id: id },
});

if (loading) return <div>Loading</div>;
if (error) return <div>Error</div>;
return <div>{data.post.title}</div>;
```

なお、ビルド時には API リクエストが発生していないが、SSR/SSG 同様にビルド時にもコンポーネントのコードは実行されている点に注意したい。  
(恐らく `useQuery` がビルド時のコンテキストで実行されたときは、リクエストをモックしてくれている)  

コンポーネントから `post_id` を取得したい場合は、下記のように書ける。  

```tsx
const router = useRouter();
const { post_id } = router.query;
```

SSG の場合は `getStaticProps` SSR の場合は `getServerSideProps` で実行時の `context` から取得して、コンポーネントの props として渡す形になっている。

```tsx
export async function getStaticProps(context) {
  const { post_id: id } = context.params;

  return {
    props: {
      id
    }
  }
}

export async function getServerSideProps(context) {
  const { post_id: id } = context.params;

  return {
    props: {
      id
    }
  }
}

const PageComponent = ({ id }) => {
  ...
};
```
