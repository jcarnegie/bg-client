import {
  listingIsExpiredForItem,
} from '@/shared/utils/marketplace';

test('listingIsExpiredForItem', () => {
  const sevenDaysFromNow = new Date().setTime(new Date().getTime() + (7 * 24 * 60 * 60 * 1000));
  const expiredItem = {
    saleExpiration: '2001-07-18T22:25:35.169Z',
  };
  const listedItem = {
    saleExpiration: sevenDaysFromNow,
  };
  expect(listingIsExpiredForItem(expiredItem)).toBe(true);
  expect(listingIsExpiredForItem(listedItem)).toBe(false);
});
