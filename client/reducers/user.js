import {USER_CHANGED, USER_ERROR, USER_LOADING} from "../../shared/constants/actions";

const user = {
  isLoading: false,
  success: false,
  data: null,
};

export default function userReducer(state = user, action) {
  switch (action.type) {
    case USER_LOADING:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false,
      });
    case USER_CHANGED:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true,
      });
    case USER_ERROR:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false,
      });
    default:
      return state;
  }
}
