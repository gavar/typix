import execa from "execa";
import slash from "slash";

export namespace git {
  /**
   * Resolve files committed by the commit with specified hash.
   * @param hash - commit hash value.
   */
  export async function filesByCommit(hash: string): Promise<string[]> {
    const raw = await execa("git", ["diff-tree", "--no-commit-id", "--name-only", "-r", hash]);
    const rows = raw.stdout.split("\n");
    return rows.map(normalize);
  }
}

function normalize(file: string) {
  return slash(file.trim());
}
