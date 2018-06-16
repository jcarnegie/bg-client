import {
  USER_SHOW_REGISTER_WORKFLOW,
  USER_CHANGED,
  USER_ERROR,
  USER_RESET,
  USER_LOADING,
} from "@/shared/constants/actions";

const user = {
  isLoading: false,
  success: false,
  data: null,
  showRegisterWorkflow: false,
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
        showRegisterWorkflow: false,
      });
    case USER_RESET:
      return Object.assign({}, user);
    case USER_ERROR:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false,
      });
    case USER_SHOW_REGISTER_WORKFLOW:
      return Object.assign({}, state, {
        showRegisterWorkflow: action.payload,
      });
    default:
      return state;
  }
}
