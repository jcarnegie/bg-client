import {
  APP_RESIZE,
  SHOW_CONVERT_MODAL,
  LAYOUT_MOBILE_MENU_SHOW,
  LAYOUT_ASIDE_RIGHT_COLLAPSED,
  LAYOUT_MOBILE_CHAT_SHOW,
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
  chatMobileShow: false,
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
    case LAYOUT_MOBILE_CHAT_SHOW:
      return Object.assign({}, state, {
        chatMobileShow: action.payload,
        showMenu: false,
      });
    case LAYOUT_MOBILE_MENU_SHOW:
      return Object.assign({}, state, {
        showMenu: action.payload.showMenu,
        chatMobileShow: false,
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
    default:
      return state;
  }
}
