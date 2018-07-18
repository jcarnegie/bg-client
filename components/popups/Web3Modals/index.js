import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'next/router';
import { compose } from 'react-apollo';

import {
  USER_SHOW_REGISTER_WORKFLOW,
} from '@/shared/constants/actions';

import {
  networkIsSupported,
} from '@/shared/utils/network';

import {
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';


import Web3Install from '@/components/popups/Web3Modals/Web3.install';
import Web3Login from '@/components/popups/Web3Modals/Web3.login';
import Web3Network from '@/components/popups/Web3Modals/Web3.network';
import Register from '@/components/popups/register';


@injectIntl
@withRouter
@connect(
  state => ({
    account: state.account,
    network: state.network,
    reduxUser: state.user,
  })
)
class Web3 extends Component {
  static propTypes = {
    account: PropTypes.object,
    router: PropTypes.object,
    network: PropTypes.object,
    reduxUser: PropTypes.object,
    user: PropTypes.object,
    registration: PropTypes.any,
    dispatch: PropTypes.func,
    pathname: PropTypes.string,
  };

  static getInitialProps(ctx) {
    let props = {};
    if (ctx && ctx.req) props.pathname = ctx.req.originalUrl;
    return props;
  }

  hideRegistrationWorkflowModals() {
    return this.props.dispatch({ type: USER_SHOW_REGISTER_WORKFLOW, payload: false });
  }

  render() {
    const { account, network, pathname, router, reduxUser } = this.props;

    const guestRoutes = [
      '',
      'faq',
      'events',
      'presale',
    ];

    /* Regex is insensitive, matches startswith. Ex: presale/bitizens is public. */
    const matchExp = new RegExp(`^(${guestRoutes.reduce((a, b) => (a + `|\\/${b}`))})`, 'i');
    const path = pathname || router.pathname;

    /* If we haven't read the account state from web3, don't render any modals */
    if (!account.success) {
      return null;
    }

    if (!path || (path.match(matchExp) && !reduxUser.showRegisterWorkflow)) {
      return null;
    }

    if (reduxUser.showRegisterWorkflow && !network.available) {
      return <Web3Install show onHide={::this.hideRegistrationWorkflowModals} />;
    }

    const onSupportedNetwork = networkIsSupported(network);
    const networkLoadedSuccess = !network.isLoading && network.success;
    const showNetwork = networkLoadedSuccess && !onSupportedNetwork;
    if (showNetwork) return <Web3Network show={true} onHide={::this.hideRegistrationWorkflowModals} />;

    const showWeb3Login = !account.wallet && (!reduxUser.data && !reduxUser.isLoading);
    if (showWeb3Login) return <Web3Login show={true} onHide={::this.hideRegistrationWorkflowModals} />;

    const userIsAlreadyRegistered = reduxUser.data && reduxUser.wallet;
    const showRegister = !userIsAlreadyRegistered && !reduxUser.isLoading && reduxUser.showRegisterWorkflow;
    if (showRegister) return <Register show={true} onHide={::this.hideRegistrationWorkflowModals} />;

    return null;
  }
}

export default compose(
  viewUserByWalletQuery
)(Web3);
