import { SuccessContext } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesBy } from "../util";

export async function success(config: WsConfiguration, context: SuccessContext) {
  return await callWorkspacesBy("success", context);
}
