import { Commit } from "../types";
import { git } from "./git";

export namespace commit {

  /** Extra properties for the particular {@link Commit}. */
  export interface Props {
    /** Files associated with the commit. */
    files: string[];
  }

  /**
   * Cache of the extra properties of {@link Commit}.
   * Key: {@link Commit#hash}
   */
  export const cache: Record<string, Partial<Props>> = {};

  /**
   * Safely get property from {@link Cache} for the commit.
   * @param commit - commit to get property for.
   * @param key - name of the property to get.
   */
  export function get<K extends keyof Props>(commit: Commit, key: K): Props[K] | void {
    return cache[commit.hash] && cache[commit.hash][key] || void 0;
  }

  /**
   * Safely set property in {@link Cache} for the commit.
   * @param commit - commit to set property for.
   * @param key - name of the property to set.
   * @param value - value of the property to set.
   */
  export function set<K extends keyof Props>(commit: Commit, key: K, value: Props[K]): void {
    cache[commit.hash] = cache[commit.hash] || {};
    cache[commit.hash][key] = value;
  }

  /** Resolve commit files from GIT log. */
  export async function updateFiles(commit: Commit): Promise<string[]> {
    const files = await git.filesByCommit(commit.hash);
    set(commit, "files", files);
    return files;
  }
}
