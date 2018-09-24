import React, { Component } from 'react';
import Router from 'next/router';
import * as log from 'loglevel';
import { pathOr } from 'ramda';

import {
  client,
  mutations,
} from '@/shared/utils/apollo';

import * as bgLocalStorage from '@/client/utils/localStorage';
import DataLoading from '@/components/DataLoading';

class RefreshToken extends Component {
  /* Client side only cos refreshToken is in local storage */
  async UNSAFE_componentWillMount() {
    if (!process.browser) return;
    const currentRefreshToken = await bgLocalStorage.getItem('refreshToken');
    const pathname = pathOr('/', ['query', 'pathname'], this.props);
    if (currentRefreshToken) {
      try {
        const { data } = await client.mutate({
          mutation: mutations.refreshToken,
          variables: { refreshToken: currentRefreshToken },
        });

        /* Refresh token failed, redirect to login */
        if (!data) {
          Router.push({ pathname: '/login', query: { pathname } }, '/login');
        }

        const { accessToken, refreshToken } = data.refreshToken;
        bgLocalStorage.setItem('refreshToken', refreshToken);
        bgLocalStorage.setItem('accessToken', accessToken);
        /* Redirect */
        Router.replace(pathname);
      } catch (err) {
        /* Refresh token failed, redirect to login */
        log.error('Refresh failed: ', err);
      }
    }
    /* No refreshToken or refresh failed, requires login */
    Router.push({ pathname: '/login', query: { pathname } }, '/login');
  }

  render() {
    /* Show loading page while refreshing token, then redirect */
    return (
      <div>
        <DataLoading />
      </div>
    );
  }
}

export default RefreshToken;
