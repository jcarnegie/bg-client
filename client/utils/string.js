import {any, curry, isEmpty, match, not} from "ramda";

export const matchesOneOf = curry((matchers, str) => {
  const doesMatch = curry((s, re) => not(isEmpty(match(re, s))));
  return any(doesMatch(str), matchers);
});
