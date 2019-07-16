import { ReleaseNotes, VerifyReleaseContext } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { callWorkspacesOf, WorkspacesHooks } from "../util";
import { askToContinue } from "../util/ask-to-continue";
import { resolveNextRelease, showReleaseSummary } from "./verify-release/";

export async function verifyRelease(options: WsConfiguration, context: VerifyReleaseContext) {
  const outputs = await callWorkspacesOf("verifyRelease", context, hooks);
  await askToContinue(options);
  return outputs;
}

const hooks: WorkspacesHooks<"verifyRelease"> = {
  async preProcessWorkspace(workspace: Workspace, owner: VerifyReleaseContext) {
    workspace.nextRelease = resolveNextRelease(workspace, owner) as ReleaseNotes;
  },

  postProcessWorkspaces(workspaces: Workspace[]) {
    showReleaseSummary(workspaces);
  },
};
