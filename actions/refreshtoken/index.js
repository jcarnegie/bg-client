import * as log from 'loglevel';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { pathOr } from 'ramda';
import * as bgLocalStorage from '@/client/utils/localStorage';
import { storeTokenData } from '@/client/utils/tokens';
import { mutations } from '@/shared/utils/apollo';

export default async({ apollo }) => {
  if (!process.browser) return;

  log.info('refreshing tokens');
  const currentRefreshToken = bgLocalStorage.getItem('refreshToken');
  const { data } = await apollo.mutate({
    mutation: mutations.refreshToken,
    variables: { refreshToken: currentRefreshToken },
  });

  /* Refresh token failed, redirect to login */
  if (!data) {
    log.info('refreshToken failed - redirecting to /login');
    // eslint-disable-next-line no-undef
    const pathname = pathOr('/', ['query', 'pathname'], __NEXT_DATA__);
    Router.push({ pathname: '/login', query: { pathname } }, '/login');
    return false;
  }

  /* Update localStorage and cookie */
  log.info('refreshToken - storing token data', data);
  storeTokenData(data.refreshToken);
  Cookies.set('accessToken', data.refreshToken.accessToken);

  return true;
};
