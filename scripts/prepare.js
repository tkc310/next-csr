const isDev = [process.env.NODE_ENV, process.env.APP_ENV, process.env.CI].every(
  (env) => env === undefined || env === 'development'
);

// development環境のみ実行
// @see https://typicode.github.io/husky/#/?id=with-a-custom-script
if (isDev) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const husky = require('husky');
  husky.install();
}
