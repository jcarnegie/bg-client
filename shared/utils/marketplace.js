/*
 * Marketplace business logic
**/

export const MARKETPLACE_DEFAULT_ITEM_LISTING_DAYS = 7;

export const listingIsExpiredForItem = item => (new Date(item.saleExpiration) <= new Date());
