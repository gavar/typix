import { GenerateNotesContext } from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../types";
import { callWorkspacesOf, WorkspacesHooks } from "../util";

export async function generateNotes(config: WsConfiguration, context: GenerateNotesContext): Promise<string> {
  return await callWorkspacesOf("generateNotes", context, hooks);
}

const hooks: WorkspacesHooks<"generateNotes"> = {
  postProcessWorkspace(workspace: Workspace, notes: string) {
    workspace.nextRelease.notes = notes;
  },

  processWorkspacesOutputs(notes: string[]): string {
    // TODO: how to merge?
    return notes.join("\n\n\n");
  },
};
