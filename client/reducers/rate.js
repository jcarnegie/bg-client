import {RATE_CHANGED, RATE_ERROR, RATE_LOADING} from "../../shared/constants/actions";

const rate = {
  isLoading: false,
  success: false,
  data: null
};

export default function rateReducer(state = rate, action) {
  switch (action.type) {
    case RATE_LOADING:
      return Object.assign({}, rate, {
        data: null,
        isLoading: true,
        success: false
      });
    case RATE_CHANGED:
      return Object.assign({}, rate, {
        data: action.payload,
        isLoading: false,
        success: true
      });
    case RATE_ERROR:
      return Object.assign({}, rate, {
        data: null,
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
