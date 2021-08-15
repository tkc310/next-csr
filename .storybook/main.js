const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],

  webpackFinal: async (config) => {
    config.module.rules = [
      // エラーを抑制するためデフォルトrulesのCSS用の設定をignore
      ...config.module.rules.filter(
        (rule) => rule.test.source !== /\.css$/.source
      ),
      // css-loader を設定しなおす
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ];

    // storybooksからも@エイリアスを利用できるようにする
    config.resolve.alias = {
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};
