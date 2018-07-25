import {
  MARKETPLACE_DEFAULT_ITEM_LISTING_DAYS,
  listingIsExpiredForItem,
} from '@/shared/utils/marketplace';

test('listingIsExpiredForItem', () => {
  const sevenDaysFromNow = new Date().setTime(new Date().getTime() + (MARKETPLACE_DEFAULT_ITEM_LISTING_DAYS * 24 * 60 * 60 * 1000));
  const manyYearsAgo = '2001-07-18T22:25:35.169Z';
  const expiredItem = { saleExpiration: manyYearsAgo };
  const listedItem = { saleExpiration: sevenDaysFromNow };
  expect(listingIsExpiredForItem(expiredItem)).toBe(true);
  expect(listingIsExpiredForItem(listedItem)).toBe(false);
});
