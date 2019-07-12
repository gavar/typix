import { NoSuchElementException } from "../exception";
import { Iterator } from "./iterator";

/** Iterator which allows to traverse object values. */
export class PropertyIterator<T> implements Iterator<T> {

  constructor(object: Record<string, T>,
              keys: string[] = Object.keys(object)) {
    this.index = 0;
    this.keys = keys;
    this.object = object;
  }

  /** Object keys to iterate. */
  private readonly keys: string[];

  /** Object being iterated.*/
  private readonly object: Record<string, T>;

  /** Zero based index of the current key. */
  private index: number;

  /** @inheritDoc */
  get hasNext(): boolean {
    return this.keys && this.keys.length > this.index + 1;
  }

  /** @inheritDoc */
  next(): T {
    if (this.hasNext) return this.object[this.keys[++this.index]];
    else throw new NoSuchElementException();
  }
}
