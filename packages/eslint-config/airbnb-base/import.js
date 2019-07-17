module.exports = {
  rules: {
    "import/order": ["error", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "ignore", // FIXME: set to never, conflicts with: import/newline-after-import + require
    }],
    "import/no-cycle": "error",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true, optionalDependencies: false }],
    "import/prefer-default-export": "off",
  },
};
