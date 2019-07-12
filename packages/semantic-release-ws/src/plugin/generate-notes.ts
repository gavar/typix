import { GenerateNotesContext } from "@typix/semantic-release";
import { WsConfiguration } from "../types";
import { callWorkspacesBy } from "../util";

export async function generateNotes(config: WsConfiguration, context: GenerateNotesContext): Promise<string> {
  // TODO: how to merge?
  const notes = await callWorkspacesBy("generateNotes", context);
    const text = notes.join("\n\n\n");
    return text;
}
