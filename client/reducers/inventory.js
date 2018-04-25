import {INVENTORY_CHANGED, INVENTORY_ERROR, INVENTORY_LOADING} from "../../shared/constants/actions";

const balance = {
  isLoading: false,
  success: false,
  data: null
};

export default function updateInventory(state = balance, action) {
  switch (action.type) {
    case INVENTORY_LOADING:
      return Object.assign({}, balance, {
        data: null,
        isLoading: true,
        success: false
      });
    case INVENTORY_CHANGED:
      return Object.assign({}, balance, {
        data: action.payload,
        isLoading: false,
        success: true
      });
    case INVENTORY_ERROR:
      return Object.assign({}, balance, {
        data: null,
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
