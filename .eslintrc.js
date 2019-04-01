module.exports = {
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: [0],
    "no-console": [0],
    "import/no-unresolved": [1]
  },
};
