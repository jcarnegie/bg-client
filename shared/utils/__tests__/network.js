import {
  networkIdToNameMap,
  networkIsSupported,
  networkIdIsSupported,
  web3IsInstalled,
  getWeb3Wallet,
  getOracleContractAddress,
  getBitGuildTokenContractAddress,
  getMarketplaceContractAddress,
  getTopupContractAddress,
  getBitizensIGOContractAddress,
  getTopupContract,
  getBitGuildTokenContract,
  getOracleContract,
  getMarketplaceContract,
  getBitizensIGOContract,
  getERC721ConformingContract,
} from '@/shared/utils/network';

describe('web3IsInstalled', () => {
  test('with web3', () => {
    window.web3 = {};
    expect(web3IsInstalled()).toBe(true);
    delete window.web3;
  });

  test('without web3', () => {
    expect(web3IsInstalled()).toBe(false);
  });
});

describe('Network methods', () => {
  test('networkIdToNameMap', () => {
    expect(networkIdToNameMap['1']).toBe('main');
    expect(networkIdToNameMap['2']).toBe('kovan');
    expect(networkIdToNameMap['3']).toBe('ropsten');
    expect(networkIdToNameMap['4']).toBe('rinkeby');
  });

  test('networkIdIsSupported', () => {
    expect(networkIdIsSupported()).toBe(false);
    expect(networkIdIsSupported(1)).toBe(true);
    expect(networkIdIsSupported(2)).toBe(false);
    expect(networkIdIsSupported(3)).toBe(false);
    expect(networkIdIsSupported(4)).toBe(true);
  });

  test('networkIsSupported', () => {
    expect(networkIsSupported()).toBe(false);
    expect(networkIsSupported({})).toBe(false);
    expect(networkIsSupported({ data: { name: 'main' } })).toBe(true);
    expect(networkIsSupported({ data: { name: 'kovan' } })).toBe(false);
    expect(networkIsSupported({ data: { name: 'ropsten' } })).toBe(false);
    expect(networkIsSupported({ data: { name: 'rinkeby' } })).toBe(true);
  });
});


test.skip('getWeb3Wallet', () => {
  expect(getWeb3Wallet()).toBe(true);
});

test.skip('getOracleContractAddress', () => {
  expect(getOracleContractAddress()).toBe(true);
});

test.skip('getBitGuildTokenContractAddress', () => {
  expect(getBitGuildTokenContractAddress()).toBe(true);
});

test.skip('getMarketplaceContractAddress', () => {
  expect(getMarketplaceContractAddress()).toBe(true);
});

test.skip('getTopupContractAddress', () => {
  expect(getTopupContractAddress()).toBe(true);
});

test.skip('getBitizensIGOContractAddress', () => {
  expect(getBitizensIGOContractAddress()).toBe(true);
});

test.skip('getTopupContract', () => {
  expect(getTopupContract()).toBe(true);
});

test.skip('getBitGuildTokenContract', () => {
  expect(getBitGuildTokenContract()).toBe(true);
});

test.skip('getOracleContract', () => {
  expect(getOracleContract()).toBe(true);
});

test.skip('getMarketplaceContract', () => {
  expect(getMarketplaceContract()).toBe(true);
});

test.skip('getBitizensIGOContract', () => {
  expect(getBitizensIGOContract()).toBe(true);
});

test.skip('getERC721ConformingContract', () => {
  expect(getERC721ConformingContract()).toBe(true);
});
