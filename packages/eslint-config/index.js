module.exports = {
  plugins: [
    "import", // `eslint-plugin-import`
    "prettier", // `eslint-plugin-prettier`
  ],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // `eslint-plugin-prettier`
  ],
  rules: {
    "import/export": "error",
    "import/order": "error",
    "no-inner-declarations": "off",
  },
};
