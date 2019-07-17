module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "import",
    "@typescript-eslint/eslint-plugin",
  ],
  parserOptions: {
    project: "tsconfig.json",
  },
  extends: [
    "plugin:@typescript-eslint/eslint-recommended", // `@typescript-eslint/eslint-plugin`@
    "plugin:@typescript-eslint/all", // `@typescript-eslint/eslint-plugin`
    "plugin:import/typescript", // `eslint-plugin-import`
  ],
  overrides: [{
    files: ["*.ts", "*.tsx"],
    rules: {
      "consistent-return": "off", // checked by TS7030 when "noImplicitReturns"
      "global-require": "off", // checked by `@typescript-eslint/no-require-imports`
      "import/export": "off", // checked by TS2308, TS2323, TS2484
    },
  }],
  rules: {
    "@typescript-eslint/explicit-function-return-type": ["warn", {
      allowExpressions: true,
      allowTypedFunctionExpressions: false,
      allowHigherOrderFunctions: true,
    }],
    "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
    "@typescript-eslint/generic-type-naming": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extra-parens": ["error", "all", { returnAssign: false }],
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/no-use-before-define": ["error", {
      functions: false,
      classes: false,
      variables: false,
      typedefs: false,
    }],
    "@typescript-eslint/no-var-requires": "off", // works same as `@typescript-eslint/no-require-imports`
    "@typescript-eslint/prefer-function-type": "off",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/unbound-method": "off",
  },
};
