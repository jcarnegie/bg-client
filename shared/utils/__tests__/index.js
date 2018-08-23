import {
  showRegistrationWorkflow,
  requireUserLoginAndSupportedNetwork,
} from '../index';


describe('Generic utilities', () => {
  test('requireUserLoginAndSupportedNetwork', () => {
    expect(requireUserLoginAndSupportedNetwork({ loading: true, viewUserByWallet: undefined }, { supported: true })).toBe(false);
    expect(requireUserLoginAndSupportedNetwork({ loading: true, viewUserByWallet: {} }, { supported: false })).toBe(false);
    expect(requireUserLoginAndSupportedNetwork({ loading: true, viewUserByWallet: {} }, { supported: true })).toBe(true);
    expect(requireUserLoginAndSupportedNetwork({ loading: false, viewUserByWallet: {} }, { supported: true })).toBe(true);
  });
});
