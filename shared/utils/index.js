import Router from "next/router";
import {USER_SHOW_REGISTER_WORKFLOW} from "@/shared/constants/actions";
import networkConfig from "@/client/utils/network";


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
