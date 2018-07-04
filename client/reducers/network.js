import * as log from "loglevel";

import {
  NETWORK_AVAILABLE,
  NETWORK_CHANGED,
  NETWORK_ERROR,
  NETWORK_LOADING,
} from "@/shared/constants/actions";

import {networkIdToName} from "@/shared/utils/network";


const network = {
  isLoading: false,
  success: false,
  data: null,
  available: null,
};


export default function networkReducer(state = network, action) {
  switch (action.type) {
    case NETWORK_AVAILABLE:
      log.info(`${action.payload ? "Found" : "Could not find"} web3 network provider on the window.`);
      return Object.assign({}, network, {
        available: action.payload,
      });
    case NETWORK_LOADING:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false,
      });
    case NETWORK_CHANGED:
      const networkName = networkIdToName(action.payload.id);
      log.info(`Setting network to "${networkName}", id resolved as ${action.payload.id} from provider.`);
      return Object.assign({}, state, {
        data: {
          name: networkName,
          id: action.payload.id,
        },
        isLoading: false,
        success: true,
      });
    case NETWORK_ERROR:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false,
      });
    default:
      return state;
  }
}
