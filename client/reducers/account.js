import * as log from "loglevel";
import {
  ACCOUNT_ERROR,
  ACCOUNT_RESET,
  ACCOUNT_LOGGED_IN,
  ACCOUNT_LOGGED_OUT,
} from "@/shared/constants/actions";

const account = {
  success: false,
  wallet: null,
};

export default function accountReducer(state = account, action) {
  switch (action.type) {
    case ACCOUNT_LOGGED_IN:
      const {wallet} = action.payload;
      log.info(`Account is logged in with wallet: ${wallet}`);
      return Object.assign({}, state, {
        wallet,
        success: true,
      });
    case ACCOUNT_LOGGED_OUT:
      log.info("Account is logged out.");
      return Object.assign({}, state, {
        wallet: null,
        success: true,
      });
    case ACCOUNT_ERROR:
      return Object.assign({}, state, {
        wallet: null,
        success: false,
      });
    case ACCOUNT_RESET:
      return Object.assign({}, account, {
        success: true, /* Must be true, because bootstrapping logic relies on its state, and state is still success */
      });
    default:
      return state;
  }
}
