import Router from 'next/router';
import { contains, propOr } from 'ramda';

import features from '@/shared/constants/features.json';
import {
  networkIsSupported,
} from '@/shared/utils/network';
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

export function userLoginRouteGuard({ store, res, ...rest }) {
  if (!store.getState().user.data) {
    client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow, variables: { on: true } });
    returnToPath('/', res);
  }
}

export function ethNetworkRouteGuard({ store, res, ...rest }) {
  if (!networkIsSupported(store.getState().network)) {
    client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow, variables: { on: true } });
    returnToPath('/', res);
  }
}

export function featureRouteGuard({ res }, featureOn) {
  if (!featureOn) {
    returnToPath('/', res);
  }
}

export const featureOn = feature => contains(env, propOr([], feature, features));
