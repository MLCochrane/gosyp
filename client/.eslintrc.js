module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
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
  plugins: ['react', 'react-hooks', '@typescript-eslint/eslint-plugin'],
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
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx', '.tsx'],
    }],
    'react/jsx-curly-spacing': [1,
      {
        when: 'always',
        children: true,
      },
    ],
    'new-cap': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/button-has-type': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
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
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: [
          '.ts',
          '.tsx',
        ],
      },
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true,
      },
    },
  },
};
