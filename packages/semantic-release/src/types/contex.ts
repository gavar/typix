import { Signale } from "signale";
import { Branch } from "./branch";
import { Options } from "./cli";
import { Commit } from "./commit";
import { Plugin } from "./plugin";
import { Release, ReleaseNotes } from "./release";
import ProcessEnv = NodeJS.ProcessEnv;
import ReadStream = NodeJS.ReadStream;
import WriteStream = NodeJS.WriteStream;

export interface Context {
  /** Working directory. */
  cwd: string;
  env: ProcessEnv;
  stdout: WriteStream;
  stderr: ReadStream;
  logger: Signale;
  options: Options;
  branches: unknown[];
  branch: Branch;
}

/** Context provided for {@link Plugin#verifyConditions} step. */
export interface VerifyConditionsContext extends Context {

}

/** Context provided for {@link Plugin#analyzeCommits} step. */
export interface AnalyzeCommitsContext extends VerifyConditionsContext {
  lastRelease: Release;
  releases: Release[];
  commits: Commit[];
}

/** Context provided for {@link Plugin#verifyRelease} step. */
export interface VerifyReleaseContext extends AnalyzeCommitsContext {
  nextRelease: Release;
}

/** Context provided for {@link Plugin#generateNotes} step. */
export interface GenerateNotesContext extends VerifyReleaseContext {

}

/** Context provided for {@link Plugin#prepare} step. */
export interface PrepareContext extends GenerateNotesContext {
  nextRelease: ReleaseNotes;
}

/** Context provided for {@link Plugin#publish} step. */
export interface PublishContext extends PrepareContext {

}

/** Context provided for {@link Plugin#success} step. */
export interface SuccessContext extends PublishContext {

}
