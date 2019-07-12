import { Signale } from "signale";

/** Apply hotfix to avoid libraries throwing errors. */
export function hotfix() {
  signale.hotfix();
}

namespace signale {
  /**
   * Fix errors caused by invalid usage of {@link Signale}.
   * @see scope
   */
  export function hotfix() {
    const {prototype} = Signale;
    prototype.scope = scope(prototype);
  }

  /** Flattens input names of {@link Signale#scope} to avoid throwing error while formatting scope name. */
  export function scope(prototype: Signale) {
    const {scope} = prototype;
    return function (this: Signale, ...names: string[]) {
      return scope.apply(this, names.flat());
    };
  }
}

