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
    if (!web3Wallet || isEmpty(wallets)) {
      redirect({}, '/login');
    }
    if (isWalletLinked) {
      redirect({}, '/');
    }
  }

  UNSAFE_componentWillMount() {
    this.checkCurrentState();
  }

  UNSAFE_componentWillUpdate() {
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

