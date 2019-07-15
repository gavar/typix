import { SuccessContext } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesOf } from "../util";

export async function success(config: WsConfiguration, context: SuccessContext) {
  return await callWorkspacesOf("success", context);
}
