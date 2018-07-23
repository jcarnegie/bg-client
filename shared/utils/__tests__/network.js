import {
  networkIdToNameMap,
  networkIsSupported,
  networkIdIsSupported,
  web3IsInstalled,
} from '@/shared/utils/network';

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
