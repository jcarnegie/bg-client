import {ACCOUNT_CHANGED, ACCOUNT_ERROR, ACCOUNT_RESET} from "@/shared/constants/actions";

const account = {
  success: false,
  wallet: null,
};

export default function accountReducer(state = account, action) {
  switch (action.type) {
    case ACCOUNT_CHANGED:
      return Object.assign({}, state, {
        wallet: action.payload.wallet,
        success: true,
      });
    case ACCOUNT_ERROR:
      return Object.assign({}, state, {
        wallet: null,
        success: false,
      });
    case ACCOUNT_RESET:
      return Object.assign({}, account);
    default:
      return state;
  }
}
