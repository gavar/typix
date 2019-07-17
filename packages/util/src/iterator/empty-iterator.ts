import { NoSuchElementException } from "../exception";
import { Iterator } from "./iterator";

/** Iterator that does not provide any elements. */
export class EmptyIterator<T = any> implements Iterator<T> {
  /** Shared instance of the {@link EmptyIterator}. */
  static readonly instance = new EmptyIterator();

  /** @inheritdoc */
  get hasNext(): boolean {
    return false;
  }

  /** @inheritdoc */
  next(): never {
    throw new NoSuchElementException();
  }
}
