/** Represents {@link Promise} resolve callback. */
export interface PromiseResolve<T = any> {
  /**
   * Resolve the promise with a value or the result of another promise.
   * @param value - value to resolve promise with.
   */
  (value: T | PromiseLike<T>): void;
}

/** Represents {@link Promise} resolve callback. */
export interface PromiseReject<T = any> {
  /**
   * Reject the promise with a provided reason or error
   * @param reason - reason of promise rejection.
   */
  (reason: any): void;
}

/**
 * Deferrable object exposing native promise properties.
 */
export interface Defer<T = any> extends Promise<T> {
  /**
   * Resolve the promise with a value or the result of another promise.
   * @param value - value to resolve promise with.
   */
  resolve(value: T | PromiseLike<T>): void;

  /**
   * Reject the promise with a provided reason or error
   * @param reason - reason of promise rejection.
   */
  reject(reason: any): void;
}

/** Creates a new {@link Promise} with exposed state. */
export function defer<T>(): Defer<T> {
  const defer = Object.assign(new Promise(executor), that);
  Object.assign(that, none);
  return defer;
}

const that: Defer = {} as any;
const none: Defer = {resolve: null, reject: null} as any;

function executor<T>(resolve: PromiseResolve<T>, reject: PromiseReject) {
  that.resolve = resolve;
  that.reject = reject;
}
