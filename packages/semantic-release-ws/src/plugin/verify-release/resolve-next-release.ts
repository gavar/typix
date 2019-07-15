import { Release, VerifyReleaseContext } from "@typix/semantic-release";
import { Workspace } from "../../types";
import { createWorkspaceContext } from "../../util";

const getNextVersion = require("semantic-release/lib/get-next-version");
const {makeTag} = require("semantic-release/lib/utils");

export function resolveNextRelease(workspace: Workspace, owner: VerifyReleaseContext): Release {
  const context = createWorkspaceContext(workspace, owner);
  const {tagFormat} = context.options;
  const release = context.nextRelease = {
    ...owner.nextRelease,
    ...workspace.nextRelease,
  };

  release.version = getNextVersion(context);
  release.gitTag = makeTag(tagFormat, release.version, release.channel);
  release.name = makeTag(tagFormat, release.version);

  // TODO: validate?
  return release;
}
