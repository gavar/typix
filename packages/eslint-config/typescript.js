module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
    project: "tsconfig.json",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
  ],
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended", // `@typescript-eslint/eslint-plugin`
    "plugin:@typescript-eslint/recommended", // `@typescript-eslint/eslint-plugin`
    "prettier/@typescript-eslint", // `eslint-config-prettier`
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".d.ts", ".js"],
      },
    },
  },
  "env": {
    "node": true,
  },
  "rules": {
    "@typescript-eslint/explicit-function-return-type": ["warn", { "allowExpressions": true }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-use-before-define": ["error", { "functions": false }],
  },
};
