module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb',
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
    'react/button-has-type' : 0,
  },
};
