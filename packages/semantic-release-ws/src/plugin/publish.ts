import { PublishContext } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesBy } from "../util";

export async function publish(input: WsConfiguration, context: PublishContext) {
  const releases = await callWorkspacesBy("publish", context);
  return releases && releases.length
    ? releases.flat()
    : false;
}
