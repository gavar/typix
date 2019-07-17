import { VerifyConditionsContext } from "@typix/semantic-release";
import { projects } from "../process";
import { WsConfiguration } from "../types";
import { callWorkspaces } from "../util";
// eslint-disable-next-line unicorn/import-index
import { configureWorkspaces, verifyYarn } from "./verify-conditions/";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function verifyConditions(config: WsConfiguration, context: VerifyConditionsContext) {
  await verifyYarn();
  const workspaces = await configureWorkspaces(config, context);

  const { cwd, logger } = context;
  if (!workspaces.length)
    logger.warn("no workspaces eligible for publishing found");

  projects[cwd] = { cwd, workspaces };
  logger.info("workspaces:", workspaces.map(x => x.name));

  return callWorkspaces("verifyConditions", context, workspaces);
}
