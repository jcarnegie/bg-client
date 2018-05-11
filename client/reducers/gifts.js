import {GIFT_CHANGED, GIFT_ERROR, GIFT_LOADING} from "../../shared/constants/actions";

const gift = {
  isLoading: false,
  success: false,
  data: null
};

export default function giftReducer(state = gift, action) {
  switch (action.type) {
    case GIFT_LOADING:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false
      });
    case GIFT_CHANGED:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });
    case GIFT_ERROR:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
