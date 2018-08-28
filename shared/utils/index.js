import Router from 'next/router';
import { contains, propOr, path } from 'ramda';

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
  /* Network is not supported */
  if (network.supported && network.supported !== null) return false;

  /* User is loading still */
  const loadingUser = path(['loading'], user);
  if (loadingUser) return false;

  /* User is not defined, show registration workflow */
  if (!path(['viewUserByWallet'], user)) {
    showRegistrationWorkflow();
    return true;
  }

  /* User is defined */
  return false;
};
