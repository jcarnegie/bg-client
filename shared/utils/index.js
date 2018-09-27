import Router from 'next/router';
import { contains, propOr, path, pathOr } from 'ramda';

import features from '@/shared/constants/features.json';

import {
  client,
  localMutations,
} from '@/shared/utils/apollo';

const env = process.env.DEPLOYED_ENV || 'local';

export const toHex = text => `0x${Buffer.from(text, 'utf8').toString('hex')}`;

export const showRegistrationWorkflow = () => client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow, variables: { on: true } });

export function featureRouteGuard({ res }, featureOn) {
  if (!featureOn) {
    Router.replace('/');
  }
}

export const featureOn = feature => contains(env, propOr([], feature, features));

/* Regex is insensitive, matches startswith. Ex: presale/bitizens is public. */
export const AUTH_ROUTES_REGEX = new RegExp('^(\/inventory|\/game|\/sandbox)', 'i'); /* eslint-disable-line no-useless-escape */

export const requireUserLoginAndSupportedNetwork = (user = {}, network = {}) => {
  /* Network is not supported */
  if (!network.supported && network.supported !== null) {
    showRegistrationWorkflow();
    return false;
  }

  /* User is not defined, show registration workflow */
  if (!path(['id'], user)) {
    showRegistrationWorkflow();
    return false;
  }

  /* User is defined */
  return true;
};

export const isWalletLinked = (wallet, me) => {
  const wallets = pathOr([], ['wallets'], me);
  return contains(wallet, wallets);
};
