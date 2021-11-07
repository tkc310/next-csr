const path = require('path');

let config = {
  reactStrictMode: true,

  // @see https://nextjs.org/docs/api-reference/next.config.js/exportPathMap#adding-a-trailing-slash
  // src/pages/posts/[post_id].tsx -> out/posts/[post_id]/index.html としてexportしてくれる
  trailingSlash: true,

  // @see https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
  // Notice: deploy前に npx tsc --noEmit を実行して型チェックすること
  typescript: {
    ignoreBuildErrors: true,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },

  swcMinify: true,

  experimental: {
    // babelrcが存在する場合はデフォルトfalseになる
    swcLoader: true,
    cpus: 4,
  },
};

// import secureHeaders from './src/config/secure-headers';

// @see https://nextjs.org/docs/messages/non-standard-node-env
switch (process.env.APP_ENV) {
  case 'development':
  // config = {
  //   ...config,
  //   ...{
  //     // Node: cspはリリースまでに問題なさそうだったら運用に乗せる
  //     // staging以降はcloudfront functionsなどでヘッダーを付ける
  //     async headers() {
  //       return [
  //         {
  //           // Apply these headers to all routes in your application.
  //           source: '/(.*)',
  //           headers: secureHeaders,
  //         },
  //       ];
  //     },
  //   },
  // };
  case 'staging':
    // productionも適用していいかも
    config = {
      ...config,
      ...{
        // @see https://nextjs.org/docs/advanced-features/source-maps
        productionBrowserSourceMaps: true,
      },
    };
    break;
  case 'production':
    break;
}

// analize
// <distDir>/analyze/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(config);
