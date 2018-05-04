import {BALANCE_PLAT_CHANGED, BALANCE_PLAT_ERROR, BALANCE_PLAT_LOADING} from "../../shared/constants/actions";

const balance = {
  isLoading: false,
  success: false,
  data: null
};

export default function updateBalancePLAT(state = balance, action) {
  switch (action.type) {
    case BALANCE_PLAT_LOADING:
      return Object.assign({}, balance, {
        data: null,
        isLoading: true,
        success: false
      });
    case BALANCE_PLAT_CHANGED:
      return Object.assign({}, balance, {
        data: action.payload,
        isLoading: false,
        success: true
      });
    case BALANCE_PLAT_ERROR:
      return Object.assign({}, balance, {
        data: null,
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
