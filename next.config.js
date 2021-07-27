// analize
// <distDir>/analyze/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  reactStrictMode: true,
  // @see https://nextjs.org/docs/api-reference/next.config.js/exportPathMap#adding-a-trailing-slash
  trailingSlash: true,
  // @see https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
  // Notice: deploy前に npx tsc --noEmit を実行して型チェックすること
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withBundleAnalyzer(config);
