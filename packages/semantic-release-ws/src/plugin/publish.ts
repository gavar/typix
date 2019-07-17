import { PublishContext, Release } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { WorkspacesHooks, callWorkspacesOf } from "../util";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function publish(input: WsConfiguration, context: PublishContext) {
  // TODO: create tags
  // TODO: push to remote
  return callWorkspacesOf("publish", context, hooks);
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
