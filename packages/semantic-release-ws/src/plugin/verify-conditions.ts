import { VerifyConditionsContext } from "@typix/semantic-release";
import { projects } from "../process";
import { WsConfiguration } from "../types";
import { callWorkspaces } from "../util";
import { configureWorkspaces, verifyYarn } from "./verify-conditions/";

export async function verifyConditions(config: WsConfiguration, context: VerifyConditionsContext) {
  await verifyYarn();
  const workspaces = await configureWorkspaces(config, context);

  const {cwd, logger} = context;
  if (workspaces.length < 1)
    logger.warn("no workspaces eligible for publishing found");

  projects[cwd] = {cwd, workspaces};
  logger.info("workspaces:", workspaces.map(x => x.name));

  return await callWorkspaces("verifyConditions", context, workspaces);
}
