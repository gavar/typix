import { PublishContext } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesBy } from "../util";

export async function publish(input: WsConfiguration, context: PublishContext) {
  return await callWorkspacesBy("publish", context);
}
