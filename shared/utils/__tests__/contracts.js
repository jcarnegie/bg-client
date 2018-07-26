import {
  listItem,
  buyItem,
  extendItem,
  withdrawItem,
  getFee,
  dataHexForCurrencyAndPrice,
  dataHexForContractAndTokenId,
} from '@/shared/utils/contracts';

const testContractAddress = '';


describe('MarketplaceContract', () => {
  test.skip('dataHexForCurrencyAndPrice', () => {
    expect(dataHexForCurrencyAndPrice({ currency: 0, price: 1000 })).toBe(true);
    expect(dataHexForCurrencyAndPrice({ currency: 1, price: 0 )).toBe(true);
  });
  test.skip('dataHexForContractAndTokenId', () => {
    expect(dataHexForContractAndTokenId({ contract: testContractAddress, tokenId: 1 })).toBe(true);
    expect(dataHexForContractAndTokenId({ contract: '', tokenId: 0 })).toBe(true);
  });
  test.skip('listItem', () => {
    expect(false).toBe(true);
  });
  test.skip('buyItem', () => {
    expect(false).toBe(true);
  });
  test.skip('extendItem', () => {
    expect(false).toBe(true);
  });
  test.skip('withdrawItem', () => {
    expect(false).toBe(true);
  });
  test.skip('getFee', () => {
    expect(false).toBe(true);
  });
});
