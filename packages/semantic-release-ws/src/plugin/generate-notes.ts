import { GenerateNotesContext } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { WorkspacesHooks, callWorkspacesOf } from "../util";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function generateNotes(config: WsConfiguration, context: GenerateNotesContext) {
  return callWorkspacesOf("generateNotes", context, hooks);
}

const hooks: WorkspacesHooks<"generateNotes"> = {
  postProcessWorkspace(workspace: Workspace, notes: string) {
    workspace.nextRelease.notes = notes;
  },

  processWorkspacesOutputs(notes: string[], workspaces: Workspace[]): string {
    notes = workspaces.map((w, i) => toReleaseNotes(w, notes[i]));
    return notes.join("\n\n");
  },
};

function toReleaseNotes(workspace: Workspace, notes: string): string {
  const lines = notes.trim().split("\n");
  const h1 = lines.findIndex(x => x.startsWith("# "));
  if (h1 >= 0) lines[h1] = `# ${workspace.name} ${lines[h1].substring(2)}`;
  else lines.unshift(`# ${workspace.name}`);
  return lines.join("\n");
}
