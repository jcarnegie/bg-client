import React, { Component } from 'react';

import Layout from '@/components/layouts';
import { SessionActionsContainer, Link } from '@/components/SessionActions';

import redirect from '@/shared/utils/redirect';
import { getWeb3Wallet } from '@/shared/utils/network';
import { contains, isEmpty, pathOr } from 'ramda';

class LinkWalletsPage extends Component {
  static getInitialProps({ me, query }) {
    return { me, query };
  }

  checkCurrentState() {
    if (!process.browser) return null;
    const web3Wallet = getWeb3Wallet();
    const wallets = pathOr([], ['me', 'wallets'], this.props);
    const isWalletLinked = contains(web3Wallet, wallets);
    const pathname = pathOr('/', ['query', 'referrer'], this.props);
    if (!web3Wallet || isEmpty(wallets)) {
      redirect({ pathname }, '/login');
    }
    if (isWalletLinked) {
      redirect({ pathname }, pathname);
    }
  }

  UNSAFE_componentWillMount() { /* eslint-disable-line camelcase */
    this.checkCurrentState();
  }

  UNSAFE_componentWillUpdate() { /* eslint-disable-line camelcase */
    this.checkCurrentState();
  }

  render() {
    return (
      <Layout showFooter={false}>
        <SessionActionsContainer>
          <Link {...this.props} />
        </SessionActionsContainer>
      </Layout>
    );
  }
};


export default LinkWalletsPage;

