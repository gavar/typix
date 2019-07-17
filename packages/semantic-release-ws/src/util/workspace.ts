import path from "path";
import { Async } from "@typix/async";
import {
  AnalyzeCommitsContext,
  Context,
  ContextType,
  Options,
  PluginReturnType,
  PluginsFunction,
  PluginsReturnType,
  PrepareContext,
  Step,
} from "@typix/semantic-release";
import { projectByContext } from "../process";
import { Workspace } from "../types";

export interface WorkspacesHooks<S extends Step> extends WorkspaceHooks<S> {
  preProcessWorkspaces?(
    workspaces: Workspace[],
    owner: ContextType[S]): Async;

  processWorkspacesOutputs?(
    outputs: PluginsReturnType<S>[],
    workspaces: Workspace[],
    owner: ContextType[S]): Async<PluginReturnType<S>>;

  postProcessWorkspaces?(
    workspaces: Workspace[],
    outputs: PluginsReturnType<S>[],
    output: PluginReturnType<S>,
    owner: ContextType[S]): Async;
}

export async function callWorkspacesOf<S extends Step>(
  step: S,
  owner: ContextType[S],
  hooks?: WorkspacesHooks<S>,
): Promise<PluginReturnType<S>> {
  const { workspaces } = projectByContext(owner);
  return callWorkspaces(step, owner, workspaces, hooks);
}

export async function callWorkspaces<S extends Step>(
  step: S,
  owner: ContextType[S],
  workspaces: Workspace[],
  hooks?: WorkspacesHooks<S>,
): Promise<PluginReturnType<S>> {
  const length = workspaces && workspaces.length || 0;

  // Process workspaces
  const outputs = new Array(length);
  for (let i = 0; i < length; i++)
    outputs[i] = await callWorkspace(step, owner, workspaces[i], hooks);

  // Process outputs
  let output: PluginReturnType<S>;
  if (hooks && hooks.processWorkspacesOutputs)
    output = await hooks.processWorkspacesOutputs(outputs, workspaces, owner);

  // Post-process hook
  if (hooks && hooks.postProcessWorkspaces)
    await hooks.postProcessWorkspaces(workspaces, outputs, output, owner);

  return output;
}

export interface WorkspaceHooks<S extends Step> {
  preProcessWorkspace?(
    workspace: Workspace,
    owner: ContextType[S]): Async;

  processWorkspaceOutput?(
    output: PluginsReturnType<S>,
    workspace: Workspace,
    owner: ContextType[S],
  ): Async<PluginsReturnType<S>>;

  postProcessWorkspace?(
    workspace: Workspace,
    output: PluginsReturnType<S>,
    owner: ContextType[S],
  ): Async;
}

export async function callWorkspace<S extends Step>(
  step: S,
  owner: ContextType[S],
  workspace: Workspace,
  hooks?: WorkspaceHooks<S>,
): Promise<PluginsReturnType<S>> {
  owner.logger.start(`start step "${step}" for workspace: ${workspace.name}`);

  // Pre-process hook
  if (hooks && hooks.preProcessWorkspace)
    await hooks.preProcessWorkspace(workspace, owner);

  // Call workspace plugin
  const context = createWorkspaceContext(workspace, owner);
  let output = await (workspace.plugins[step] as PluginsFunction<S>)(context);

  // Process output
  if (hooks && hooks.processWorkspaceOutput)
    output = await hooks.processWorkspaceOutput(output, workspace, owner);

  // Post-process hook
  if (hooks && hooks.postProcessWorkspace)
    await hooks.postProcessWorkspace(workspace, output, owner);

  owner.logger.complete(`complete step "${step}" for workspace: ${workspace.name}`);
  return output;
}

export function createWorkspace(root: Context, name: string, relative: string): Workspace {
  const cwd = path.join(root.cwd, relative);
  return { cwd, name } as Workspace;
}

export function createWorkspaceContext<T extends Context>(w: Workspace, owner: T, options: Options = w.options): T {
  const context = {
    ...owner,
    options,
  } as T & AnalyzeCommitsContext & PrepareContext;
  context.cwd = w.cwd;
  context.env = { ...owner.env };
  context.logger = owner.logger.scope(w.name);
  if (w.commits)
    context.commits = w.commits;

  if (w.lastRelease)
    context.lastRelease = w.lastRelease;

  if (w.nextRelease)
    context.nextRelease = w.nextRelease;

  return context;
}
