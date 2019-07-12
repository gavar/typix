import { PrepareContext } from "@typix/semantic-release";
import { callWorkspacesBy } from "../util";
import { WsConfiguration } from "../types";

export async function prepare(config: WsConfiguration, context: PrepareContext) {
  return await callWorkspacesBy("prepare", context);
}
