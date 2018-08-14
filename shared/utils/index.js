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
