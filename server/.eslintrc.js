module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 0,
    'consistent-return': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-throw-literal': 0,
    'import/no-cycle': 0,
    radix: 0,
  },
}
