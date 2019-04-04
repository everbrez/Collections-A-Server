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
    semi: "off",
    "no-console": "off",
    "no-plusplus": "off",
    "import/no-unresolved": "off",
    quotes: ["warn", "single"]
  },
};
