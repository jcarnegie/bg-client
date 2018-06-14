import {MENU_SHOW} from "../../shared/constants/actions";

const menu = {
  showMenu: false,
};

export default function itemsReducer(state = menu, action) {
  switch (action.type) {
    case MENU_SHOW:
      return Object.assign({}, state, {
        showMenu: action.payload.showMenu,
      });
    default:
      return state;
  }
}
