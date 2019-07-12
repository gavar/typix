import { each } from "@typix/async";
import { AnalyzeCommitsContext, commit, ReleaseType } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesBy } from "../util";

export async function analyzeCommits(config: WsConfiguration, context: AnalyzeCommitsContext): Promise<ReleaseType> {
  context.logger.start("resolving commit files");
  await each(context.commits, commit.updateFiles);
  const releaseTypes = await callWorkspacesBy("analyzeCommits", context);
  if (releaseTypes)
    return selectReleaseType(releaseTypes);
}

function selectReleaseType(values: ReleaseType[]): ReleaseType {
  let max: number = 0;
  let type: ReleaseType;
  for (const value of values)
    if (weights[value] > max)
      max = weights[type = value];
  return type;
}

const weights: Record<ReleaseType, number> = {
  patch: 1,
  minor: 2,
  major: 3,
};
