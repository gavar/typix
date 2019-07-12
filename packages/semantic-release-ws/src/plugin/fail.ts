import { Context } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesBy } from "../util";

export async function fail(config: WsConfiguration, context: Context) {
  return await callWorkspacesBy("fail", context);
}
