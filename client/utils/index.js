import redirect from '@/shared/utils/redirect';
import { getWeb3Wallet } from '@/shared/utils/network';
import { contains, pathOr } from 'ramda';

/* Redirect to landing page if user is already logged in but on login or register page */
export const redirectBasedOnState = (me, pathname = '/') => {
  if (!process.browser) return null;
  const web3Wallet = getWeb3Wallet();
  const wallets = pathOr([], ['wallets'], me);
  if (contains(web3Wallet, wallets)) redirect({ pathname }, pathname);
};
