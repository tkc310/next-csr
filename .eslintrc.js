module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // @see https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'es2021',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  // @refs: https://gist.github.com/sin-tanaka/b18bf1b5b46bd685fee93bd26fb473b3
  rules: {
    // 関数の戻り値はtsの推論に任せる (exportする関数は必要)
    '@typescript-eslint/explicit-function-return-type': 'off',
    // anyを禁止 (必要なケースは行コメントでignoreする)
    '@typescript-eslint/no-explicit-any': 'error',
    // ts-ignoreを許可する
    '@typescript-eslint/ban-ts-comment': 'off',
    // type Props = {} などを許可する ()
    '@typescript-eslint/ban-types': [
      'off',
      {
        types: {
          '{}': false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
