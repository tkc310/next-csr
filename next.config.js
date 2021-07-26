// analize
// <distDir>/analyze/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer(config);
