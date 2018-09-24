import {
  showRegistrationWorkflow,
  requireUserLoginAndSupportedNetwork,
} from '../index';


describe('Generic utilities', () => {
  test.skip('requireUserLoginAndSupportedNetwork', () => {
    expect(requireUserLoginAndSupportedNetwork({ loading: true, user: undefined }, { supported: true })).toBe(false);
    expect(requireUserLoginAndSupportedNetwork({ loading: false, user: {} }, { supported: false })).toBe(false);
    expect(requireUserLoginAndSupportedNetwork({ loading: true, user: undefined }, { supported: false })).toBe(false);
    expect(requireUserLoginAndSupportedNetwork({ loading: false, user: undefined }, { supported: false })).toBe(false);
    expect(requireUserLoginAndSupportedNetwork({ loading: false, user: undefined }, { supported: true })).toBe(false);
    expect(requireUserLoginAndSupportedNetwork({ loading: false, user: {} }, { supported: true })).toBe(true);
  });
});
