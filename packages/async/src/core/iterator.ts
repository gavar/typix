import { ArrayIterator, EmptyIterator, Iterator, PropertyIterator } from "@typix/util";
import { isArrayLike, isObjectLike } from "lodash";

/** Defines possible types available for iteration. */
export type Iterable<T> =
  | ArrayLike<T>
  | Record<string, T>;

/**
 * Create iterator fo the iterable of the given type.
 * @param iterable - iterable collection.
 */
export function iterator<T>(iterable: Iterable<T>): Iterator<T> {
  return isArrayLike(iterable) ? new ArrayIterator<T>(iterable)
    : isObjectLike(iterable) ? new PropertyIterator<T>(iterable)
      : EmptyIterator.instance;
}
