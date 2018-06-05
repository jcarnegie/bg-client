import {GAS_CHANGED, GAS_ERROR, GAS_LOADING} from "../../shared/constants/actions";

const gas = {
  isLoading: false,
  success: false,
  data: null,
};

export default function gameReducer(state = gas, action) {
  switch (action.type) {
    case GAS_LOADING:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false,
      });
    case GAS_CHANGED:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true,
      });
    case GAS_ERROR:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false,
      });
    default:
      return state;
  }
}
