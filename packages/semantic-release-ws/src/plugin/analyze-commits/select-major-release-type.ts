import { ReleaseType } from "@typix/semantic-release";

/**
 * Select most major release type form the provided values.
 * @param releaseTypes - release types to choose from.
 */
export function selectMajorReleaseType(releaseTypes: ReleaseType[]): ReleaseType {
  let max: number = 0;
  let major: ReleaseType;
  for (const releaseType of releaseTypes)
    if (releaseTypeWeights[releaseType] > max)
      max = releaseTypeWeights[major = releaseType];
  return major;
}

export const releaseTypeWeights: Record<ReleaseType, number> = {
  patch: 1,
  minor: 2,
  major: 3,
};
