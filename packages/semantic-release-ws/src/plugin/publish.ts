import { PublishContext, Release } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesOf, WorkspacesHooks } from "../util";

export async function publish(input: WsConfiguration, context: PublishContext) {
  // TODO: create tags
  // TODO: push to remote
  return await callWorkspacesOf("publish", context, hooks);
}

const hooks: WorkspacesHooks<"publish"> = {
  processWorkspacesOutputs(releases: Release[][]): void | false | Release {
    if (releases && releases.length) {
      const flat = releases.flat().filter(x => x.type);
      // TODO: normalize to a single Release object
      // `plugin/hotfix` allows to return array
      return flat.length && flat as any;
    }
  },
};
