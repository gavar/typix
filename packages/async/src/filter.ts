import { elseNone, Iterable, iterator, pullNone } from "./core";
import { then } from "./then";
import { Async, AsyncPredicate } from "./types";

/**
 * Gets a new array containing values that match async predicate.
 * Performs in parallel, but keeps items in the original order.
 * May complete synchronously when predicate completes synchronously for all values.
 * @param iterable - a collection to iterate over.
 * @param predicate - predicate defining criteria to match.
 * @see Promise#all
 */
export function filter<T>(iterable: Iterable<Async<T>>, predicate: AsyncPredicate<T>): Promise<T[]> {
  const values: Async<T>[] = [];
  for (const it = iterator(iterable); it.hasNext;) {
    const value = it.next();
    const match = then(value, predicate);
    const async = then(match, elseNone, value);
    values.push(async);
  }

  return Promise.all(values)
    .then(pullNone);
}
