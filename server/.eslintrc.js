module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-plusplus': 0,
    'prefer-destructuring': ['error', {
      object: true,
      array: false,
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'new-cap': 0,
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      mjs: 'never',
    }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
