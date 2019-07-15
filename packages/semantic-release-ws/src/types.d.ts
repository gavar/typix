import {
  AnalyzeCommitsContext,
  Options,
  Plugins,
  Release,
  ReleaseNotes,
  VerifyReleaseContext,
} from "@typix/semantic-release";

export interface WsConfiguration {
  options?: Partial<Options>;
}

export interface Workspace {
  /** Path to the workspace root. */
  cwd: string;

  /** Name of the workspace package. */
  name: string;

  /** Options provided by the workspace `.releaserc` config. */
  options: Options;

  /** Workspace plugins. */
  plugins: Plugins;

  /** @see AnalyzeCommitsContext#lastRelease */
  lastRelease: Release;

  /** @see VerifyReleaseContext#nextRelease */
  nextRelease: ReleaseNotes;
}

/** Project information. */
export interface Project {
  /** Project root path. */
  cwd: string;
  /** List of project workspaces. */
  workspaces: Workspace[];
}

/**
 * Projects information shared in a process.
 */
export interface Projects {
  /**
   * Project instance by path.
   * @see {@link Context#cwd};
   */
  [cwd: string]: Project;
}
