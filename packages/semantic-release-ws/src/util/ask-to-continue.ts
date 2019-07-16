import { prompt } from "inquirer";
import { WsConfiguration } from "../types";

export async function askToContinue(options: WsConfiguration, message: string = "do you want to continue?"): Promise<void> {
  if (options.ci || options.confirm)
    return;

  const answers = await prompt({
    type: "confirm",
    name: "ok",
    message,
  }) as Record<"ok", boolean>;

  if (!answers.ok) {
    console.error("abort by user");
    process.exit(1);
  }
}
