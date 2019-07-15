require("../../boot");
module.exports = {
  tagFormat: "v/@typix/${version}",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
  ],
};
