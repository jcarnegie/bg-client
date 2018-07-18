import {
  filter,
  flatten,
  is,
  length,
  map,
  not,
  propIs,
  values,
  uniq,
} from 'ramda';
import { matchesOneOf } from './string';

export const STATS_MATCHERS = [
  // +10%, +20%, etc
  /\+\d+%/,
  // range: "1 - 10", "20-30", etc
  /\d+\s*-\s*\d+/,
];

export const isStat = attr =>
  propIs(Number, 'value', attr) || matchesOneOf(STATS_MATCHERS, attr.value);

export const itemStats = item =>
  filter(isStat, values(item.attrs));

export const isValidItemCategory = category =>
  not(is(Number, category) || matchesOneOf(STATS_MATCHERS, category));

export const calcMaxItemsStats = items => {
  const stats = map(itemStats, items);
  const lengths = map(length, stats);
  return Math.max(...lengths);
};

export const getAttrsFromItems = items => {
  return flatten(items.map(item => values(item.attrs || {})));
};

export const getCategoriesFromItemAttrs = attrs => {
  const sortedAttrs = attrs.sort((a, b) => {
    const aKey = a.keyLan.toLowerCase();
    const bKey = b.keyLan.toLowerCase();
    if (aKey > bKey) return 1;
    if (aKey < bKey) return -1;
    return 0;
  });

  return uniq(sortedAttrs.map(attr => attr.value));
};
