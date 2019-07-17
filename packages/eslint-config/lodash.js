module.exports = {
  plugins: ["lodash"],
  extends: [
    "plugin:lodash/recommended",
    "plugin:you-dont-need-lodash-underscore/compatible",
  ],
  rules: {
    "lodash/import-scope": ["error", "member"],
    "lodash/is-nil": "off",
    "lodash/prefer-constant": "off",
    "lodash/prefer-get": "off",
    "lodash/prefer-immutable-method": "off",
    "lodash/prefer-includes": ["error", { includeNative: false }],
    "lodash/prefer-lodash-method": "off",
    "lodash/prefer-lodash-typecheck": "off",
    "lodash/prefer-matches": "off",
    "lodash/prefer-some": ["error", { includeNative: false }],
  },
};
