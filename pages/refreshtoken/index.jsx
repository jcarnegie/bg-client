import { Component } from 'react';
import { pathOr } from 'ramda';
import { initApollo } from '@/shared/utils/apollo/client';
import doRefreshToken from '@/actions/refreshtoken';

const refresh = async() => {
  if (!process.browser) return;
  const apollo = initApollo({}, { getToken: () => null });
  const refreshed = await doRefreshToken({ apollo });
  if (refreshed) {
    // eslint-disable-next-line no-undef
    const pathname = pathOr('/', ['query', 'pathname'], __NEXT_DATA__);
    window.location.replace(pathname);
  }
};

refresh();

class RefreshTokenPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    // Keep the page blank - better experience than loading page
    return null;
  }
};

export default RefreshTokenPage;
