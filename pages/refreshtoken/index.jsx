import React, { Component } from 'react';
import * as log from 'loglevel';
import Router from 'next/router';
import Layout from '@/components/layouts';
import RefreshToken from '@/components/RefreshToken';
import { pathOr } from 'ramda';
import * as bgLocalStorage from '@/client/utils/localStorage';
import { initApollo } from '@/shared/utils/apollo/client';
import { mutations } from '@/shared/utils/apollo';

const refreshToken = async() => {
  if (!process.browser) return;
  const client = initApollo({}, { getToken: () => null });

  const currentRefreshToken = bgLocalStorage.getItem('refreshToken');
  const { data } = await client.mutate({
    mutation: mutations.refreshToken,
    variables: { refreshToken: currentRefreshToken },
  });

  /* Refresh token failed, redirect to login */
  // eslint-disable-next-line no-undef
  const pathname = pathOr('/', ['query', 'pathname'], __NEXT_DATA__);
  if (!data) {
    Router.push({ pathname: '/login', query: { pathname } }, '/login');
  }

  /* refreshed token, redirect to referring page */
  const { accessToken, refreshToken } = data.refreshToken;
  bgLocalStorage.setItem('refreshToken', refreshToken);
  bgLocalStorage.setItem('accessToken', accessToken);
  /* Redirect */
  // Todo: test if Router is initialized. If not, use window.location.replace (see below)
  log.info(`Time to refreshtoken redirect: ${new Date().getTime() - window._$start.getTime()} ms`);
  Router.replace(pathname);
  // window.location.replace(pathname);
  log.info(`Time to refreshtoken (after) redirect: ${new Date().getTime() - window._$start.getTime()} ms`);
};

refreshToken();

class RefreshTokenPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <Layout showFooter={false}>
        <RefreshToken {...this.props} />
      </Layout>
    );
  }
};

export default RefreshTokenPage;
