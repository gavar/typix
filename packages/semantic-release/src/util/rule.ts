import { Async, find, then } from "@typix/async";

/**
 * Rule asynchronously checking validity of the value state.
 */
export type AsyncRule<T> = (value: T) => Async<true | string>;

/**
 * Check if value violates any of the provided rules.
 * Performs asynchronously, but returns first violation reported.
 * @param value - value to check.
 * @param rules - rules to apply.
 * @returns rule violation message if any.
 */
export function check<T>(value: T, ...rules: AsyncRule<T>[]): Async<void | string> {
  const tests = rules.map(test, value);
  const violation = find(tests, isViolation, true);
  return then(violation, toViolation);
}

/**
 * Check if the value contains rule violation message.
 * @param value - value to check.
 */
function isViolation(value: true | string): boolean {
  return value !== true;
}

/**
 * Resolve violation value of the provided value.
 * @param value - value to resolve.
 */
function toViolation(value: true | string): void | string {
  if (value !== true)
    return value || "unknown error";
}

function test<T>(this: T, rule: AsyncRule<T>): Async<true | string> {
  return rule(this);
}
