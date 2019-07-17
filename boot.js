/* eslint-disable import/newline-after-import */
require("ts-node/register");

let env = require("dotenv").config();
env = require("dotenv-expand")(env);
Object.assign(process.env, env.parsed);
