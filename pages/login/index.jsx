import React, { Component } from 'react';

import Layout from '@/components/layouts';
import { SessionActionsContainer, Login } from '@/components/SessionActions';

import redirect from '@/shared/utils/redirect';
import { getWeb3Wallet } from '@/shared/utils/network';
import { contains, pathOr } from 'ramda';

class LoginPage extends Component {
  static getInitialProps({ me, query }) {
    return { me, query };
  }

  checkCurrentState() {
    /* Redirect to landing page if user is already logged in but on login or register page */
    if (!process.browser) return null;
    const web3Wallet = getWeb3Wallet();
    const wallets = pathOr([], ['me', 'wallets'], this.props);
    const isWalletLinked = contains(web3Wallet, wallets);
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
          <Login {...this.props} />
        </SessionActionsContainer>
      </Layout>
    );
  }
};

export default LoginPage;
