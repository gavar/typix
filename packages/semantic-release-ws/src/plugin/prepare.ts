import { PrepareContext } from "@typix/semantic-release";
import { callWorkspacesOf } from "../util";
import { WsConfiguration } from "../types";

export async function prepare(config: WsConfiguration, context: PrepareContext) {
  return await callWorkspacesOf("prepare", context);
}
