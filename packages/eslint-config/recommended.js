const { resolve } = require;
module.exports = {
  plugins: [
    "no-use-extend-native",
    "promise",
  ],
  extends: [
    "eslint:recommended",
    resolve("./airbnb-base"),
    resolve("./eslint-comments"),
    resolve("./unicorn"),
    resolve("./jsdoc"),
  ],
};
