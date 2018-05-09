import {GAME_CHANGED, GAME_ERROR, GAME_LOADING} from "../../shared/constants/actions";

const game = {
  isLoading: false,
  success: false,
  data: null
};

export default function gameReducer(state = game, action) {
  switch (action.type) {
    case GAME_LOADING:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false
      });
    case GAME_CHANGED:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });
    case GAME_ERROR:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false
      });
    default:
      return state;
  }
}
