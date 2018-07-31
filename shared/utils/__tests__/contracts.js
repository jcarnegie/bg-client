import Web3 from 'web3';

import {
  listItem,
  buyItem,
  extendItem,
  withdrawItem,
  getFee,
  dataHexForCurrencyAndPrice,
  dataHexForContractAndTokenId,
} from '@/shared/utils/contracts';

const testContractAddress = '0x856c82b392fa4041c3a63b3a8c8a7f258d2f27e0';


describe('MarketplaceContract methods', () => {
  beforeAll(() => {
    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  });
  afterAll(() => {
    delete window.web3;
  });
  test('dataHexForCurrencyAndPrice', () => {
    const expectedPLAT = '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003635c9adc5dea00000';
    const expectedETH = '0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000016345785d8a0000';
    expect(dataHexForCurrencyAndPrice({ currency: 0, price: 1000 })).toBe(expectedPLAT);
    expect(dataHexForCurrencyAndPrice({ currency: 1, price: 0.1 })).toBe(expectedETH);
  });
  test('dataHexForContractAndTokenId', () => {
    const expectedWithTestContract = '0x000000000000000000000000856c82b392fa4041c3a63b3a8c8a7f258d2f27e00000000000000000000000000000000000000000000000000000000000000001';
    const expectedWithEmptyContract = '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    expect(dataHexForContractAndTokenId({ contract: testContractAddress, tokenId: 1 })).toBe(expectedWithTestContract);
    expect(dataHexForContractAndTokenId({ contract: '', tokenId: 0 })).toBe(expectedWithEmptyContract);
  });

  test.skip('listItem', async() => {
    expect(listItem).toThrow(Error); /* Should reject with Error without valid params */
  });

  test.skip('buyItem', async() => {
    expect(buyItem).toThrow(Error); /* Should reject with Error without valid params */
  });

  test.skip('extendItem', async() => {
    expect(extendItem).toThrow(Error); /* Should reject with Error without valid params */
  });

  test.skip('withdrawItem', async() => {
    expect(withdrawItem).toThrow(Error); /* Should reject with Error without valid params */
  });

  test.skip('getFee', async() => {
    expect(getFee).toThrow(Error); /* Should reject with Error without valid params */
  });
});
