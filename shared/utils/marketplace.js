/*
 * Marketplace business logic
**/

export const listingIsExpiredForItem = item => (new Date(item.saleExpiration) <= new Date());
