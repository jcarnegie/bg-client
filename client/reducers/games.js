import {INVENTORY_GAMES_CHANGED, INVENTORY_GAMES_ERROR, INVENTORY_GAMES_LOADING} from "../../shared/constants/actions";

const games = {
  isLoading: false,
  success: false,
  data: null,
};

export default function gameReducer(state = games, action) {
  switch (action.type) {
    case INVENTORY_GAMES_LOADING:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false,
      });
    case INVENTORY_GAMES_CHANGED:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true,
      });
    case INVENTORY_GAMES_ERROR:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false,
      });
    default:
      return state;
  }
}
