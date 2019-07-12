import { Context } from "@typix/semantic-release";
import { callWorkspacesBy } from "../util";
import { WsConfiguration } from "../types";

export async function verifyRelease(config: WsConfiguration, context: Context) {
  return await callWorkspacesBy("verifyConditions", context);
}
