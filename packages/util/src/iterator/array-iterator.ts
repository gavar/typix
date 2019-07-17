import { NoSuchElementException } from "../exception";
import { Iterator } from "./iterator";

/** Iterator which allows to traverse {@link ArrayLike} objects. */
export class ArrayIterator<T> implements Iterator<T> {
  /** Array of items to iterate. */
  private readonly items: ArrayLike<T>;

  /** Zero based index of the current element. */
  private index: number;

  constructor(items: ArrayLike<T>) {
    this.items = items;
    this.index = -1;
  }

  /** @inheritdoc */
  get hasNext(): boolean {
    return this.items && this.items.length > this.index + 1;
  }

  /** @inheritdoc */
  next(): T {
    if (this.hasNext)
      return this.items[++this.index];
    throw new NoSuchElementException();
  }
}
