// Note: nonceディレクティブを使わない & ホワイトリストの登録をする時点であまり意味がない
// (google analyticsでさえ脆弱性が存在する)
// ホワイトリスト登録形式でcspを導入しても、現実的には開発コストとのトレードオフになってしまう
// なお、report-uriの通知先は https://report-uri.com/ が無料で利用できる

// e.g google関連リソースのホワイトリストを登録
// @see https://developers.google.com/tag-manager/web/csp?hl=ja
const CSP_DIRECTIVE = `
default-src
'self'
;

form-action
'http://localhost:3001'
;

connect-src
'http://localhost:3001'
'https://www.google-analytics.com'
;

script-src
'unsafe-inline'
'unsafe-eval'
'self'
'https://www.googletagmanager.com'
'https://tagmanager.google.com'
'https://www.google-analytics.com'
'https://www.googleadservices.com'
'https://www.google.com'
'https://www.googleadservices.com'
'https://googleads.g.doubleclick.net'
;

style-src
'unsafe-inline'
'self'
'https://tagmanager.google.com'
'https://fonts.googleapis.com'
;

img-src
'data:'
'self'
'www.googletagmanager.com'
'https://ssl.gstatic.com'
'https://www.gstatic.com'
'https://www.google-analytics.com'
'https://googleads.g.doubleclick.net'
'https://www.google.com'
;

font-src
'data:'
'self'
'https://fonts.gstatic.com'
;

frame-src
'self'
'https://bid.g.doubleclick.net'
;
`
  .trim()
  .replace(/\n/g, ' ')
  .replace(/ ;/g, ';');

// report-uri;
// sentry.io/api/xxxxx/security/?sentry_key=yyyyy&sentry_environment=prod&sentry_release=csp002

https: const secureHeaders = [
  // force https (Enabled for staging and above)
  // {
  //   key: 'Strict-Transport-Security',
  //   value: 'max-age=31536000; includeSubDomains; preload',
  // },

  // @see https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },

  // @see https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },

  // @see (IE bug) https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/jj542450(v=vs.85)?#the-noopen-directive
  {
    key: 'X-Download-Options',
    value: 'noopen',
  },

  // @see https://developer.mozilla.org/ja/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: CSP_DIRECTIVE,
  },
];

export default secureHeaders;
