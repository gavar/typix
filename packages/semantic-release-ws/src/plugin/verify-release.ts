import { VerifyReleaseContext } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { callWorkspacesOf, createWorkspaceContext, WorkspacesHooks } from "../util";

const getNextVersion = require("semantic-release/lib/get-next-version");
const {makeTag} = require("semantic-release/lib/utils");

export async function verifyRelease(config: WsConfiguration, context: VerifyReleaseContext) {
  return await callWorkspacesOf("verifyRelease", context, hooks);
}

const hooks: WorkspacesHooks<"verifyRelease"> = {
  async preProcessWorkspace(workspace: Workspace, owner: VerifyReleaseContext) {
    const release = workspace.nextRelease = {
      ...owner.nextRelease,
      ...workspace.nextRelease,
    };
    const context = createWorkspaceContext(workspace, owner);
    const {tagFormat} = context.options;
    release.version = getNextVersion(context);
    release.gitTag = makeTag(tagFormat, release.version, release.channel);
    release.name = makeTag(tagFormat, release.version);
    // TODO: validate?
  },
};
