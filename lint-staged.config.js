// @see https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js

// pre-commit時にstageされているファイルのみ実行
module.exports = {
  // type check
  '**/*.(ts|tsx)': () => [`npx tsc --pretty --noEmit`],

  // eslint & prettier
  '**/*.(ts|tsx|js)': (filenames) => [
    `npx eslint --fix ${filenames.join(' ')}`,
    `npx prettier --write ${filenames.join(' ')}`,
  ],

  // prettier markdown json
  '**/*.(markdown|json)': (filenames) =>
    `npx prettier --write ${filenames.join(' ')}`,
};
