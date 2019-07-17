const { resolve } = require;
module.exports = {
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "eslint-config-airbnb-base",
    resolve("./best-practices"),
    resolve("./errors"),
    resolve("./style"),
    resolve("./variables"),
    resolve("./import"),
  ],
};
