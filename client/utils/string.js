import {any, curry, isEmpty, isNil, match, not} from "ramda";

export const matchesOneOf = curry((matchers, str) => {
  if (isNil(str)) return false;
  const doesMatch = curry((s, re) => not(isEmpty(match(re, s))));
  return any(doesMatch(str), matchers);
});
