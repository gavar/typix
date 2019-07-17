const globbby = require("globby");
const execa = require("execa");

(async function () {
  const packages = await globbby(["**/package.json", "!node_modules"]);
  const exe = require.resolve("sort-package-json");
  console.log(">>", exe, packages);
  await execa(exe, packages);
}());
