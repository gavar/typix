module.exports = {
  rules: {},
  overrides: [{
    files: ["*.js", "*.jsx"],
    rules: {
      // allow to import using `require` in js
      "global-require": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  }],
};
