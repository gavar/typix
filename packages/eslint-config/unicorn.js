module.exports = {
  extends: "plugin:unicorn/recommended",
  rules: {
    "unicorn/catch-error-name": "off",
    "unicorn/explicit-length-check": "off",
    "unicorn/no-process-exit": "off",
    "unicorn/prevent-abbreviations": "off",
  },
};
