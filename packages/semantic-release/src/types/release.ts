export type ReleaseType = "major" | "minor" | "patch";

export interface Release {
  type: ReleaseType;
  channel: unknown;
  gitHead: string;
  version: string;
  gitTag: string;
  name: string;
}

export interface ReleaseNotes extends Release {
  notes: string;
}
