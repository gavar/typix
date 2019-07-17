module.exports = {
  rules: {
    "import/named": "off", // TODO: enable, disabled due to poor performance
    "import/no-cycle": "off", // TODO: enable, disabled due to poor performance
    "import/no-extraneous-dependencies": ["error", { devDependencies: true, optionalDependencies: false }],
    "import/order": ["error", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "ignore", // FIXME: set to never, conflicts with: import/newline-after-import + require
    }],
    "import/prefer-default-export": "off",
  },
};
