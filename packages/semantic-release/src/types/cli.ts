export interface Branch {
  name: string;
  prerelease: boolean;
}

export type BranchType
  = string
  | Branch
  ;

export interface Options {
  extends: string | string[];
  branches: BranchType | Array<BranchType>;
  repositoryUrl: string;
  tagFormat: string;
  plugins: Array<string | [string, object]>;
  dryRun: boolean;
  ci: boolean;
  debug: boolean;
}
