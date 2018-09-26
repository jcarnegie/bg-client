import cookie from 'cookie';
import * as localStorage from '@/client/utils/localStorage';
import { pathOr } from 'ramda';

export const parseCookies = (req, options = {}) => {
  let ckie = '';
  if (req) {
    ckie = pathOr('', ['headers', 'cookie'], req);
  } else {
    ckie = (typeof document !== 'undefined') ? document.cookie : '';
  }
  return cookie.parse(ckie, options);
};

export const getToken = req => {
  if (process.browser) {
    return localStorage.getItem('accessToken');
  } else {
    return parseCookies(req).accessToken;
  }
};
