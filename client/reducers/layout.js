import {
  MENU_SHOW,
  APP_RESIZE,
  SHOW_CONVERT_MODAL,
  LAYOUT_ASIDE_RIGHT_COLLAPSED,
} from '@/shared/constants/actions';
import { breakpoints } from '@/shared/constants/style';


const layout = {
  showMenu: false,
  asideRightCollapsed: false,
  asideRightWidth: '285px',
  asideRightCollapsedWidth: '60px',
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
    case LAYOUT_ASIDE_RIGHT_COLLAPSED:
      return Object.assign({}, state, {
        asideRightCollapsed: action.payload,
      });
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
    case MENU_SHOW:
      return Object.assign({}, state, {
        showMenu: action.payload.showMenu,
      });
    default:
      return state;
  }
}
