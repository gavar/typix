import { filter } from "@typix/async";
import {
  check,
  hasSemanticReleaseConfig,
  VerifyConditionsContext,
  VerifyReleaseContext,
} from "@typix/semantic-release";
import { Workspace, WsConfiguration } from "../../types";
import { createWorkspace, createWorkspaceContext, yarn } from "../../util";

const getConfig = require("semantic-release/lib/get-config");

export async function configureWorkspaces(config: WsConfiguration, source: VerifyConditionsContext): Promise<Workspace[]> {
  const {logger, cwd} = source;
  logger.start("resolving workspaces");
  const info = await yarn.workspace.info(cwd);
  let workspaces = Object.entries(info).map(toWorkspace, source);
  workspaces = await filter(workspaces, item => checkWorkspace(item, source)) || [];

  if (workspaces.length) {
    // preserve original CLI options
    const yargs = require("yargs");
    const options = {...yargs.argv};

    // apply common options for all workspaces
    if (config.options)
      Object.assign(options, config.options);

    // initialize workspace plugins
    for (const workspace of workspaces) {
      logger.start("configuring workspace: ", workspace.name);
      const context = createWorkspaceContext(workspace, source, null);
      const config = await getConfig(context, options);
      Object.assign(workspace, config);
    }
  }

  return workspaces;
}

function toWorkspace(this: VerifyReleaseContext, [key, value]: [string, yarn.Workspace]) {
  return createWorkspace(this, key, value.location);
}

async function checkWorkspace(workspace: Workspace, {logger}: VerifyConditionsContext): Promise<boolean> {
  // TODO: check packages is private?
  const violation = await check(workspace,
    checkSemanticReleaseConfig,
  );

  if (typeof violation === "string") {
    logger.warn(`skipping workspace '${workspace.name}': ${violation}`);
    return false;
  }

  return true;
}

async function checkSemanticReleaseConfig(workspace: Workspace): Promise<true | string> {
  return await hasSemanticReleaseConfig(workspace.cwd)
    || "unable to find semantic release configuration";
}
