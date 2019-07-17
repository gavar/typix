import { ReleaseNotes, VerifyReleaseContext } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { WorkspacesHooks, callWorkspacesOf } from "../util";
import { askToContinue } from "../util/ask-to-continue";
// eslint-disable-next-line unicorn/import-index
import { resolveNextRelease, showReleaseSummary } from "./verify-release/";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
