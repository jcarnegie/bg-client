import {NETWORK_CHANGED, NETWORK_ERROR, NETWORK_LOADING} from "../../shared/constants/actions";

const network = {
  isLoading: false,
  success: false,
  data: null,
};

export default function rateReducer(state = network, action) {
  switch (action.type) {
    case NETWORK_LOADING:
      return Object.assign({}, network, {
        data: null,
        isLoading: true,
        success: false,
      });
    case NETWORK_CHANGED:
      return Object.assign({}, network, {
        data: action.payload,
        isLoading: false,
        success: true,
      });
    case NETWORK_ERROR:
      return Object.assign({}, network, {
        data: null,
        isLoading: false,
        success: false,
      });
    default:
      return state;
  }
}
