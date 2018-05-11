import {
  filter,
  is,
  length,
  map,
  not,
  propIs,
  values
} from "ramda";
import {matchesOneOf} from "./string";

export const STATS_MATCHERS = [
  // +10%, +20%, etc
  /\+\d+%/,
  // range: "1 - 10", "20-30", etc
  /\d+\s*-\s*\d+/
];

export const isStat = attr =>
  propIs(Number, "value", attr) || matchesOneOf(STATS_MATCHERS, attr.value);

export const itemStats = item =>
  filter(isStat, values(item.attributes));

export const isValidItemCategory = category =>
  not(is(Number, category) || matchesOneOf(STATS_MATCHERS, category));

export const calcMaxItemsStats = items => {
  const stats = map(itemStats, items);
  const lengths = map(length, stats);
  return Math.max(...lengths);
};
