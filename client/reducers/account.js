import {ACCOUNT_CHANGED, ACCOUNT_ERROR} from "../../shared/constants/actions";

const account = {
  isLoading: false,
  success: false,
  wallet: null
};

export default function accountReducer(state = account, action) {
  switch (action.type) {
    case ACCOUNT_CHANGED:
      return Object.assign({}, state, {
        wallet: action.payload.wallet,
        isLoading: false,
        success: true
      });
    case ACCOUNT_ERROR:
      return Object.assign({}, state, {
        wallet: null,
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
