module.exports = {
  env: {
    node: true, // Informuje ESLint, żeby oczekiwać globalnych zmiennych Node.js jak 'module'
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    // Twoje indywidualne reguły
  },
}
