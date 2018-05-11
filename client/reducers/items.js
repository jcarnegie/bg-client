import {INVENTORY_ITEMS_CHANGED, INVENTORY_ITEMS_ERROR, INVENTORY_ITEMS_LOADING} from "../../shared/constants/actions";

const balance = {
  isLoading: false,
  success: false,
  data: null
};

export default function itemsReducer(state = balance, action) {
  switch (action.type) {
    case INVENTORY_ITEMS_LOADING:
      return Object.assign({}, balance, {
        data: null,
        isLoading: true,
        success: false
      });
    case INVENTORY_ITEMS_CHANGED:
      return Object.assign({}, balance, {
        data: action.payload,
        isLoading: false,
        success: true
      });
    case INVENTORY_ITEMS_ERROR:
      return Object.assign({}, balance, {
        data: null,
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}