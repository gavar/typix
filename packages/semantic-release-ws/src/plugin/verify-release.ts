import { VerifyReleaseContext } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesBy } from "../util";

export async function verifyRelease(config: WsConfiguration, context: VerifyReleaseContext) {
  return await callWorkspacesBy("verifyRelease", context);
}
