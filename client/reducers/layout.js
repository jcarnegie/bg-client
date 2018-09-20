import { merge } from 'ramda';
import {
  APP_RESIZE,
  APP_LAYOUT_SET_DEFAULTS,
  SHOW_CONVERT_MODAL,
  LAYOUT_MOBILE_MENU_SHOW,
} from '@/shared/constants/actions';
import { breakpoints } from '@/shared/constants/style';


const layout = {
  showMenu: false,
  innerWidth: 1401,
  innerHeight: 1401,
  type: {
    mobile: true,
    desktop: false,
  },
  showConvertModal: false,
};

export default function itemsReducer(state = layout, action) {
  switch (action.type) {
    case SHOW_CONVERT_MODAL:
      return Object.assign({}, state, {
        showConvertModal: action.payload,
      });
    case LAYOUT_MOBILE_MENU_SHOW:
      return Object.assign({}, state, {
        showMenu: action.payload.showMenu,
      });
    case APP_LAYOUT_SET_DEFAULTS:
      return Object.assign({}, state, { type: merge(state.type, action.payload.type) });
    case APP_RESIZE:
      const { innerWidth } = window;
      const { innerHeight } = window;
      let mobile = false;
      let desktop = false;

      if (innerWidth < breakpoints.mobile.maxWidth) {
        mobile = true;
        desktop = false;
      } else if (innerWidth > breakpoints.desktop.minWidth) {
        mobile = false;
        desktop = true;
      }

      return Object.assign({}, state, {
        innerWidth,
        innerHeight,
        type: {
          mobile,
          desktop,
        },
      });
    default:
      return state;
  }
}
