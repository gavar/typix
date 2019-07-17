import { PrepareContext } from "@typix/semantic-release";
import { callWorkspacesOf } from "../util";
import { WsConfiguration } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function prepare(config: WsConfiguration, context: PrepareContext) {
  return callWorkspacesOf("prepare", context);
}
