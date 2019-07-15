import { ReleaseNotes, VerifyReleaseContext } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { callWorkspacesOf, WorkspacesHooks } from "../util";
import { resolveNextRelease, showReleaseSummary } from "./verify-release/";

export async function verifyRelease(config: WsConfiguration, context: VerifyReleaseContext) {
  return await callWorkspacesOf("verifyRelease", context, hooks);
}

const hooks: WorkspacesHooks<"verifyRelease"> = {
  async preProcessWorkspace(workspace: Workspace, owner: VerifyReleaseContext) {
    workspace.nextRelease = resolveNextRelease(workspace, owner) as ReleaseNotes;
  },
  postProcessWorkspaces(workspaces: Workspace[]) {
    showReleaseSummary(workspaces);
  },
};
