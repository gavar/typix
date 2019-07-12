import execa from "execa";
import { EOL } from "os";

export namespace git {
  /**
   * Resolve files committed by the commit with specified hash.
   * @param hash - commit hash value.
   */
  export async function filesByCommit(hash: string): Promise<string[]> {
    const r = await execa("git", ["diff-tree", "--no-commit-id", "--name-only", "-r", hash]);
    return r.stdout.split(EOL);
  }
}
