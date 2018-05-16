import {GIFT_ADD, GIFT_ERROR, GIFT_LOADING, GIFT_REMOVE} from "../../shared/constants/actions";

const gift = {
  isLoading: false,
  success: false,
  data: []
};

export default function giftReducer(state = gift, action) {
  switch (action.type) {
    case GIFT_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        success: false
      });
    case GIFT_ADD:
      return Object.assign({}, state, {
        data: state.data.concat(action.payload)
      });
    case GIFT_REMOVE:
      return Object.assign({}, state, {
        data: state.data.filter(gift => !action.payload.includes(gift.tx))
      });
    case GIFT_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
