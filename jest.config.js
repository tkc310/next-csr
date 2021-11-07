module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transformIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',

  transform: {
    '.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,

        module: {
          type: 'commonjs',
        },

        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },

          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
};
