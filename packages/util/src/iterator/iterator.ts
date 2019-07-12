/**
 * Iterator over a collection.
 * @template T - type of elements returned by this iterator.
 * @see {@link https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/Iterator.html java.util.Iterator<T>}
 */
export interface Iterator<T = any> {

  /** Whether the iteration has more elements. */
  readonly hasNext: boolean;

  /**
   * Returns the next element in the iteration.
   * @returns the next element in the iteration.
   * @throws NoSuchElementException when the iteration has no more elements.
   */
  next(): T;
}
