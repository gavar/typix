/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Context, Release } from "@typix/semantic-release";
import { parse } from "semver";

const base = require("semantic-release/lib/get-last-release");

/**
 * Resolve last release information for the provided context.
 * Fallbacks to package version if no related tag found.
 */
export function getLastRelease(context: Context): Release {
  const release: Release = base(context);
  // use package.json version as initial
  if (!release.version) {
    const pkg = require(`${context.cwd}/package.json`);
    if (pkg.version) {
      release.version = pkg.version;
      const { prerelease } = parse(pkg.version);
      if (prerelease.length)
        [release.version] = prerelease;
    }
  }
  return release;
}
