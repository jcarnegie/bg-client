import {GIFT_ADD_LOADING, GIFT_ADD_ERROR, GIFT_REMOVE_ERROR, GIFT_REMOVE_LOADING, GIFT_REMOVE_SUCCESS, GIFT_ADD_SUCCESS} from "../../shared/constants/actions";

const gift = {
  isLoading: false,
  success: true,
  data: [],
};

export default function giftReducer(state = gift, action) {
  switch (action.type) {
    case GIFT_ADD_LOADING:
    case GIFT_REMOVE_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        success: false,
      });
    case GIFT_ADD_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.concat(action.payload),
        isLoading: false,
        success: true,
      });
    case GIFT_REMOVE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.filter(gift => !action.payload.includes(gift.tx)),
        isLoading: false,
        success: true,
      });
    case GIFT_ADD_ERROR:
    case GIFT_REMOVE_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        success: false,
      });
    default:
      return state;
  }
}
