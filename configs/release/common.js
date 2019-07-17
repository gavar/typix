/* eslint-disable @typescript-eslint/no-require-imports */
require("../../boot");

module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
  ],
};
