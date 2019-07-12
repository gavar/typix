import {
  AnalyzeCommitsContext,
  Context,
  GenerateNotesContext,
  PrepareContext,
  PublishContext,
  SuccessContext,
  VerifyConditionsContext,
  VerifyReleaseContext,
} from "./contex";
import { ReleaseType } from "./release";

/**
 * Plugin step type.
 * @see https://semantic-release.gitbook.io/semantic-release/v/beta/usage/plugins
 */
export type Step =
  | "verifyConditions"
  | "analyzeCommits"
  | "verifyRelease"
  | "generateNotes"
  | "prepare"
  | "publish"
  | "success"
  | "fail"
  ;

/**
 * Defines what kind of context provided for the particular release step.
 */
export type ContextType = {
  verifyConditions: VerifyConditionsContext;
  analyzeCommits: AnalyzeCommitsContext;
  verifyRelease: VerifyReleaseContext;
  generateNotes: GenerateNotesContext;
  prepare: PrepareContext;
  publish: PublishContext;
  success: SuccessContext;
  fail: Context;
};

/**
 * Defines result type for the particular release step.
 */
export type ResultType = {
  verifyConditions: void;
  analyzeCommits: ReleaseType;
  verifyRelease: void;
  generateNotes: string;
  prepare: void;
  publish: void;
  success: void;
  fail: void;
};

/** Set of release steps available for implementation by plugin. */
export interface Plugin<T = any> {
  verifyConditions(config: T, context: VerifyConditionsContext): Promise<void>;
  analyzeCommits(config: T, context: AnalyzeCommitsContext): Promise<ReleaseType>;
  verifyRelease(config: T, context: VerifyReleaseContext): Promise<void>;
  generateNotes(config: T, context: GenerateNotesContext): Promise<string>;
  prepare(config: T, context: PrepareContext): Promise<void>;
  publish(config: T, context: PublishContext): Promise<void>;
  success(config: T, context: SuccessContext): Promise<void>;
  fail(config: T, context: Context): Promise<void>;
}

/** Defines function signature for particular step of {@link Plugin}. */
export type PluginFunction<S extends Step = any, T = any> = (config: T, context: ContextType[S]) => Promise<ResultType[S]>;

/**
 * All plugins steps available as a single function invocation,
 * which receiving context as first and single argument.
 */
export interface Plugins {
  verifyConditions(context: VerifyConditionsContext): Promise<void>;
  analyzeCommits(context: AnalyzeCommitsContext): Promise<ReleaseType>;
  verifyRelease(context: VerifyReleaseContext): Promise<void>;
  generateNotes(context: GenerateNotesContext): Promise<string>;
  prepare(context: PrepareContext): Promise<void>;
  publish(context: PublishContext): Promise<void>;
  success(context: SuccessContext): Promise<void>;
  fail(context: Context): Promise<void>;
}

/** Defines function signature for particular step of {@link Plugins}. */
export type PluginsFunction<S extends Step> = (context: ContextType[S]) => Promise<ResultType[S]>

