import Router from "next/router";
import {contains, propOr} from "ramda";
import {USER_SHOW_REGISTER_WORKFLOW} from "@/shared/constants/actions";
import features from "@/shared/constants/features.json";
import networkConfig from "@/client/utils/network";

const env = process.env.NODE_ENV || "development";

export function returnToPath(path, res) {
  if (res) {
    res.redirect(path);
  } else {
    Router.push(path);
  }
}

export function userLoginRouteGuard({store, res}) {
  const user = store.getState().user;

  if (!user.data) {
    store.dispatch({type: USER_SHOW_REGISTER_WORKFLOW, payload: true});
    returnToPath("/", res);
  }
}

export function ethNetworkRouteGuard({store, res}) {
  const network = store.getState().network;
  const onSupportedNetwork = network.data && Object.keys(networkConfig).includes(network.data.id);

  if (!onSupportedNetwork) {
    store.dispatch({type: USER_SHOW_REGISTER_WORKFLOW, payload: true});
    returnToPath("/", res);
  }
}

export function featureRouteGuard({res}, featureOn) {
  if (!featureOn) {
    returnToPath("/", res);
  }
}

export const featureOn = feature => contains(env, propOr([], feature, features));
