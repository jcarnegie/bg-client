import {BALANCE_ETH_CHANGED, BALANCE_ETH_ERROR, BALANCE_ETH_LOADING} from "../../shared/constants/actions";

const balance = {
  isLoading: false,
  success: false,
  data: null
};

export default function updateBalanceETH(state = balance, action) {
  switch (action.type) {
    case BALANCE_ETH_LOADING:
      return Object.assign({}, balance, {
        data: null,
        isLoading: true,
        success: false
      });
    case BALANCE_ETH_CHANGED:
      return Object.assign({}, balance, {
        data: action.payload,
        isLoading: false,
        success: true
      });
    case BALANCE_ETH_ERROR:
      return Object.assign({}, balance, {
        data: null,
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
