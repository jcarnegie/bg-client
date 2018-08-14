import Router from 'next/router';
import { contains, propOr } from 'ramda';

import features from '@/shared/constants/features.json';

import {
  client,
  localMutations,
} from '@/shared/utils/apollo';

const env = process.env.DEPLOYED_ENV || 'local';

export const showRegistrationWorkflow = () => client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow, variables: { on: true } });

export function featureRouteGuard({ res }, featureOn) {
  if (!featureOn) {
    Router.replace('/');
  }
}

export const featureOn = feature => contains(env, propOr([], feature, features));


export const AUTH_ROUTES = [
  'inventory',
  'game',
];


/* Regex is insensitive, matches startswith. Ex: presale/bitizens is public. */
export const AUTH_ROUTES_REGEX = new RegExp('^(\/inventory|\/game)', 'i'); /* eslint-disable-line no-useless-escape */

export const requireUserLoginAndSupportedNetwork = (user = {}, network = {}) => {
  if ((!user.loading && !user.viewUserByWallet) || (!network.supported && network.supported !== null)) {
    if (!user.loading || network.supported !== null) showRegistrationWorkflow();
    return false;
  }
  return true;
};
