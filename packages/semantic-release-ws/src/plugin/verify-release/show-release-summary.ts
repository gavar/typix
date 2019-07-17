import { identity } from "lodash";
import { Workspace } from "../../types";

/**
 * Show table of release summary per workspace.
 * @param workspaces - workspaces to include into a summary.
 */
export function showReleaseSummary(workspaces: Workspace[]): void {
  const rows = workspaces.map(w => w.nextRelease.type && [
    w.name,
    w.lastRelease.version,
    w.nextRelease.version,
    w.nextRelease.type,
  ]).filter(identity);

  const table = rows.map(t => ({
    "name": t[0],
    "last": t[1],
    "next": t[2],
    "release-type": t[3],
  }));

  console.table(table);
}
