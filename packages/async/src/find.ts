import { Iterable, iterator } from "./core";
import { Defer, defer } from "./defer";
import { isAsync, then } from "./then";
import { Async, AsyncPredicate } from "./types";

/**
 * Gets the first item that match the predicate.
 * Performs in parallel, so wins who's faster, rather then while closer to the beginning.
 * May complete synchronously when any value matches predicate synchronously.
 * @param iterable - a collection to iterate over.
 * @param predicate - predicate defining criteria to match.
 * @param defaultValue - value to return when none of the items match the predicate.
 */
export function find<T>(iterable: Iterable<Async<T>>, predicate: AsyncPredicate<T>, defaultValue?: Async<T>): Async<T> {
  let ctx: AsyncContext<T>;
  for (const it = iterator(iterable); it.hasNext;) {
    const value = it.next();
    const match = then(value, predicate);
    if (isAsync(match)) {
      ctx = ctx || new AsyncContext<T>(defaultValue);
      ctx.listen(value, match);
    } else if (match) {
      if (ctx) ctx.done = true;
      return value;
    }
  }
  return ctx.wait();
}

class AsyncContext<T> {
  done: boolean;
  private count: number;
  private promise: Defer<T>;
  private readonly defaultValue: Async<T>;

  constructor(defaultValue: Async<T>) {
    this.count = 0;
    this.promise = defer();
    this.defaultValue = defaultValue;
  }

  listen(value: Async<T>, test: Promise<boolean>): void {
    this.count++;
    test.then(x => this.consume(value, x), this.reject);
  }

  consume(value: Async<T>, match: boolean): void {
    if (!this.done)
      if (match)
        this.resolve(value);
      else if (--this.count === 0)
        this.resolve(this.defaultValue);
  }

  resolve(value: Async<T>): void {
    this.done = true;
    this.promise.resolve(value);
  }

  reject = (reason: any): void => {
    this.done = true;
    this.promise.resolve(reason);
  };

  wait(): Promise<T> {
    return (this.promise = defer());
  }
}
