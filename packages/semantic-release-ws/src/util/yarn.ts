import execa from "execa";
import { which } from "shelljs";

export namespace yarn {
  /** Check yarn installed. */
  export function is(): boolean {
    return !!which("yarn");
  }

  /** Yarn workspace info. */
  export interface Workspace {
    location: string;
    workspaceDependencies: string[];
    mismatchedWorkspaceDependencies: string[];
  }

  export namespace workspace {
    /** Get Yarn workspaces info. */
    export async function info(cwd?: string): Promise<Record<string, Workspace>> {
      const res = await execa("yarn workspaces info", { cwd });
      const raw = res.stdout.trim();
      const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
      return JSON.parse(json);
    }
  }
}
