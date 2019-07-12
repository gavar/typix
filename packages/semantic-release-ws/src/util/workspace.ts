import {
  Context,
  ContextType,
  Options,
  PluginsFunction,
  PrepareContext,
  ReleaseType,
  ResultType,
  Step,
  VerifyReleaseContext,
} from "@typix/semantic-release";
import path from "path";
import { projects } from "../process";
import { Workspace } from "../types";

export function createWorkspace(root: Context, name: string, relative: string): Workspace {
  const cwd = path.join(root.cwd, relative);
  return {
    cwd,
    name,
    results: {} as any,
    options: null as any,
    plugins: null,
  };
}

export function createWorkspaceContext<T extends Context>(workspace: Workspace, source: T, options: Options): T {
  const {cwd, name, results} = workspace;
  let {env, logger} = source;
  env = {...env};
  logger = logger.scope(name);
  const context = {...source, cwd, env, logger, options};

  // copy results of previous steps
  // required since `semantic-release` makes deep clones of contexts
  for (const key in results) {
    const value = results[key as Step];
    const processor = contextResultProcessors[key as Step];
    if (processor) processor(context, value);
  }

  return context;
}

type ContextResultProcessor = (context: any, value: any) => void;
const contextResultProcessors: Partial<Record<Step, ContextResultProcessor>> = {
  analyzeCommits(context: VerifyReleaseContext, releaseType: ReleaseType): void {
    context.nextRelease.type = releaseType;
  },
  generateNotes(context: PrepareContext, notes: string): void {
    context.nextRelease.notes = notes;
  },
};

export async function callWorkspace<S extends Step>(step: S, source: ContextType[S], workspace: Workspace): Promise<ResultType[S]> {
  const {logger} = source;
  const {options, plugins, name} = workspace;
  logger.start(`start step "${step}" for workspace: ${name}`);
  const context = createWorkspaceContext(workspace, source, options);
  const result = await (plugins[step] as PluginsFunction<S>)(context);
  logger.complete(`complete step "${step}" for workspace: ${name}`);
  return result;
}

export async function callWorkspaces<S extends Step>(step: S, source: ContextType[S], workspaces: Workspace[]): Promise<ResultType[S][]> {
  const results = [];
  for (const workspace of workspaces) {
    const result = await callWorkspace(step, source, workspace);
    workspace.results[step] = result;
    if (result != null) results.push(result);
  }

  if (results.length)
    return results;
}

export async function callWorkspacesBy<S extends Step>(step: S, source: ContextType[S]): Promise<ResultType[S][]> {
  const {cwd} = source;
  const {workspaces} = projects[cwd];
  return await callWorkspaces(step, source, workspaces);
}

