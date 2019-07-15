import { Context } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesOf } from "../util";

export async function fail(config: WsConfiguration, context: Context) {
  return await callWorkspacesOf("fail", context);
}
