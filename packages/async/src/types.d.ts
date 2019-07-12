import { Iterable } from "./core";

/** Value that may be result of an async operation. */
export type Async<T = unknown> = T | Promise<T>;

/** Collection containing async items to iterate. */
export type AsyncIterable<T> = Iterable<Async<T>>;

/**
 * Asynchronous action that receives arguments but returns no result.
 * @template P - arguments types.
 */
export type AsyncAction<P extends any[] = []> = (...params: P) => Async;

/**
 * Asynchronous function that receives arguments and returns a value.
 * @template R - return value type.
 * @template P - arguments types.
 */
export type AsyncFunction<R = any, P extends any[] = []> = (...params: P) => Async<R>;

/**
 * Asynchronous function that defines a set of criteria and determines
 * whether the specified object meets those criteria.
 * @template T - type of the object to check.
 */
export type AsyncPredicate<T> = (value: T) => Async<boolean>;
