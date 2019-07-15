import { each } from "@typix/async";
import { AnalyzeCommitsContext, ReleaseNotes, ReleaseType, updateCommitFiles } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { callWorkspacesOf, createWorkspaceContext, WorkspacesHooks } from "../util";
import { selectMajorReleaseType, showReleaseTypesSummary } from "./analyze-commits/";

const getLastRelease = require("semantic-release/lib/get-last-release");

export async function analyzeCommits(config: WsConfiguration, context: AnalyzeCommitsContext): Promise<ReleaseType> {
  context.logger.start("resolving commit files");
  await each(context.commits, updateCommitFiles);
  return await callWorkspacesOf("analyzeCommits", context, hooks);
}

const hooks: WorkspacesHooks<"analyzeCommits"> = {

  preProcessWorkspace(workspace: Workspace, owner: AnalyzeCommitsContext) {
    const context = createWorkspaceContext(workspace, owner);
    workspace.lastRelease = getLastRelease(context);
  },

  postProcessWorkspace(workspace: Workspace, releaseType: ReleaseType) {
    workspace.nextRelease = {
      type: releaseType,
    } as ReleaseNotes;
  },

  /** @inheritDoc */
  processWorkspacesOutputs(releaseTypes: ReleaseType[]): ReleaseType {
    return selectMajorReleaseType(releaseTypes);
  },

  /** @inheritDoc */
  postProcessWorkspaces(workspaces: Workspace[], releaseTypes: ReleaseType[], releaseType: ReleaseType) {
    showReleaseTypesSummary(workspaces, releaseType);
  },
};

