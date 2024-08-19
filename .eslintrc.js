module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // 这里添加自定义的 ESLint 规则
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
