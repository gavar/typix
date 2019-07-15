import { each } from "@typix/async";
import { AnalyzeCommitsContext, commit, ReleaseNotes, ReleaseType } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { callWorkspacesOf, createWorkspaceContext, WorkspacesHooks } from "../util";

const getLastRelease = require("semantic-release/lib/get-last-release");

export async function analyzeCommits(config: WsConfiguration, context: AnalyzeCommitsContext): Promise<ReleaseType> {
  context.logger.start("resolving commit files");
  await each(context.commits, commit.updateFiles);
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

  processWorkspacesOutputs(releaseTypes: ReleaseType[]): ReleaseType {
    let max: number = 0;
    let output: ReleaseType;
    for (const releaseType of releaseTypes)
      if (releaseWeights[releaseType] > max)
        max = releaseWeights[output = releaseType];
    return output;
  },

  postProcessWorkspaces(workspaces: Workspace[], releaseTypes: ReleaseType[], releaseType: ReleaseType) {
    const rows = workspaces.map(w => [w.name, w.nextRelease.type]);
    rows.push(["~", releaseType]);
    const table = rows.map(t => ({name: t[0], "release-type": t[1]}));
    console.table(table);
  },
};

const releaseWeights: Record<ReleaseType, number> = {
  patch: 1,
  minor: 2,
  major: 3,
};
