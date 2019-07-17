import { each } from "@typix/async";
import { AnalyzeCommitsContext, ReleaseNotes, ReleaseType, updateCommitFiles } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { WorkspacesHooks, callWorkspacesOf, createWorkspaceContext } from "../util";
// eslint-disable-next-line unicorn/import-index
import { getLastRelease, ownCommitsOf, selectMajorReleaseType, showReleaseTypesSummary } from "./analyze-commits/";

const SHOW_SUMMARY = false;

export async function analyzeCommits(config: WsConfiguration, context: AnalyzeCommitsContext): Promise<ReleaseType> {
  context.logger.start("resolving commit files");
  await each(context.commits, updateCommitFiles);
  return callWorkspacesOf("analyzeCommits", context, hooks);
}

const hooks: WorkspacesHooks<"analyzeCommits"> = {
  preProcessWorkspace(workspace: Workspace, owner: AnalyzeCommitsContext) {
    const context = createWorkspaceContext(workspace, owner);
    workspace.commits = ownCommitsOf(context);
    workspace.lastRelease = getLastRelease(context);
  },

  postProcessWorkspace(workspace: Workspace, releaseType: ReleaseType) {
    workspace.nextRelease = {
      type: releaseType,
    } as ReleaseNotes;
  },

  /** @inheritdoc */
  processWorkspacesOutputs(releaseTypes: ReleaseType[]): ReleaseType {
    return selectMajorReleaseType(releaseTypes);
  },

  /** @inheritdoc */
  postProcessWorkspaces(workspaces: Workspace[], releaseTypes: ReleaseType[], releaseType: ReleaseType) {
    if (SHOW_SUMMARY)
      showReleaseTypesSummary(workspaces, releaseType);
  },
};
