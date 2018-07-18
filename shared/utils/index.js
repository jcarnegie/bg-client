import Router from 'next/router';
import { contains, propOr } from 'ramda';
import { USER_SHOW_REGISTER_WORKFLOW } from '@/shared/constants/actions';
import features from '@/shared/constants/features.json';
import { networkIsSupported } from '@/shared/utils/network';

const env = process.env.DEPLOYED_ENV || 'local';

export function returnToPath(path, res) {
  if (!res) {
    Router.push(path);
  }
}

export function userLoginRouteGuard({ store, res }) {
  if (!store.getState().user.data) {
    store.dispatch({ type: USER_SHOW_REGISTER_WORKFLOW, payload: true });
    returnToPath('/', res);
  }
}

export function ethNetworkRouteGuard({ store, res }) {
  if (!networkIsSupported(store.getState().network)) {
    store.dispatch({ type: USER_SHOW_REGISTER_WORKFLOW, payload: true });
    returnToPath('/', res);
  }
}

export function featureRouteGuard({ res }, featureOn) {
  if (!featureOn) {
    returnToPath('/', res);
  }
}

export const featureOn = feature => contains(env, propOr([], feature, features));
