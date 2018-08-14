import Router from 'next/router';
import { contains, propOr } from 'ramda';

import features from '@/shared/constants/features.json';

import {
  client,
  localMutations,
} from '@/shared/utils/apollo';

const env = process.env.DEPLOYED_ENV || 'local';

export function returnToPath(path, res) {
  if (!res) {
    Router.push(path);
  }
}

export const showRegistrationWorkflow = () => client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow, variables: { on: true } });

export const AUTH_ROUTES_WHITELIST = [
  '/game',
  '/inventory',
];

export const redirectToHomeIfOnAuthRoute = async() => {
  if (AUTH_ROUTES_WHITELIST.includes(Router.route)) {
    Router.push('/');
    await showRegistrationWorkflow();
  }
};

export function featureRouteGuard({ res }, featureOn) {
  if (!featureOn) {
    Router.push('/');
  }
}

export const featureOn = feature => contains(env, propOr([], feature, features));
