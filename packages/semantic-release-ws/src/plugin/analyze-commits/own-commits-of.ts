import { AnalyzeCommitsContext, Commit, commitGet } from "@typix/semantic-release";
import path from "path";
import slash from "slash";

/**
 * Pick only those commits that relates to provided context.
 * @param context - context defining package root path: {@link AnalyzeCommitsContext#cwd}.
 */
export function ownCommitsOf(context: AnalyzeCommitsContext): Commit[] {
  const prefix = slash(path.relative(process.cwd(), context.cwd)) + "/";
  return context.commits.filter(isOwnCommit, prefix);
}

function isOwnCommit(this: string, commit: Commit): boolean {
  const files = commitGet(commit, "files");
  return !!files.find(startsWith, this);
}

function startsWith(this: string, file: string): boolean {
  return file.startsWith(this);
}
