import {BALANCE_ETH_CHANGED, BALANCE_ETH_ERROR, BALANCE_ETH_LOADING} from "../../shared/constants/actions";

const balance = {
  isLoading: false,
  success: false,
  data: 0
};

export default function updateBalanceETH(state = balance, action) {
  switch (action.type) {
    case BALANCE_ETH_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        success: false
      });
    case BALANCE_ETH_CHANGED:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });
    case BALANCE_ETH_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
