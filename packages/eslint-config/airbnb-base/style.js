module.exports = {
  rules: {
    "array-bracket-newline": ["error", "consistent"],
    "array-element-newline": ["error", "consistent"],
    "func-names": "off",
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    // make 120 chars since types takes a lot of space
    "max-len": ["error", 120, {
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
    }],
    "no-mixed-operators": "off", // TODO: enable?
    "no-multi-assign": "off",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "no-nested-ternary": "off",
    "no-restricted-syntax": ["error", {
      selector: "LabeledStatement",
      message: "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
    }, {
      selector: "WithStatement",
      message: "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
    }],
    "nonblock-statement-body-position": ["error", "any"],
    "object-curly-newline": ["error", { multiline: true, consistent: true }],
    "quote-props": ["error", "consistent-as-needed", { keywords: false, unnecessary: true, numbers: false }],
    "quotes": ["error", "double", { avoidEscape: true }],
  },
};
