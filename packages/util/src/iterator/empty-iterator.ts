import { NoSuchElementException } from "../exception";
import { Iterator } from "./iterator";

/** Iterator that does not provide any elements. */
export class EmptyIterator<T = any> implements Iterator<T> {

  /** Shared instance of the {@link EmptyIterator}. */
  public static readonly instance = new EmptyIterator();

  /** @inheritDoc */
  get hasNext(): boolean {
    return false;
  };

  /** @inheritDoc */
  next(): never {
    throw new NoSuchElementException();
  }
}
