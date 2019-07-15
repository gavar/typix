require("./boot");
module.exports = {
  tagFormat: "v/latest/${version}",
  plugins: [
    "@typix/semantic-release-ws",
  ],
};
