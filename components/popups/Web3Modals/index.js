import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withRouter } from 'next/router';
import {
  compose,
  graphql,
} from 'react-apollo';

import {
  client,
  viewUserByWalletQuery,
  localMutations,
  localQueries,
} from '@/shared/utils/apollo';

import {
  AUTH_ROUTES_REGEX,
} from '@/shared/utils';

import Web3Install from '@/components/popups/Web3Modals/Web3.install';
import Web3Login from '@/components/popups/Web3Modals/Web3.login';
import Web3Network from '@/components/popups/Web3Modals/Web3.network';
import Register from '@/components/popups/register';


@injectIntl
@withRouter
class Web3 extends Component {
  static propTypes = {
    account: PropTypes.object,
    router: PropTypes.object,
    network: PropTypes.object,
    user: PropTypes.object,
    data: PropTypes.shape({
      network: PropTypes.object,
      wallet: PropTypes.string,
      loading: PropTypes.bool,
    }),
    registration: PropTypes.any,
    pathname: PropTypes.string,
  };

  static getInitialProps(ctx) {
    let props = {};
    if (ctx && ctx.req) props.pathname = ctx.req.originalUrl;
    return props;
  }

  hideRegistrationWorkflowModals() {
    return client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow, variables: { on: false } });
  }

  render() {
    const { pathname, router, data, user } = this.props;
    const { network, wallet, loading, showUserRegistrationWorkflow } = data;

    const path = pathname || router.pathname;

    /* If we haven't read the wallet state from web3, don't render any modals */
    if (!path || (!path.match(AUTH_ROUTES_REGEX) && !showUserRegistrationWorkflow)) return null;

    if (showUserRegistrationWorkflow && !network.available && !network.available === null) {
      return <Web3Install show onHide={::this.hideRegistrationWorkflowModals} />;
    }

    const networkLoadedSuccess = !loading && network.available;
    const showNetwork = networkLoadedSuccess && !network.supported && !network.supported === null;
    if (showNetwork) return <Web3Network show={true} onHide={::this.hideRegistrationWorkflowModals} />;

    const showWeb3Login = (!wallet && !loading && wallet === null);
    if (showWeb3Login) return <Web3Login show={true} onHide={::this.hideRegistrationWorkflowModals} />;

    const userIsAlreadyRegistered = user.viewUserByWallet && wallet;
    const showRegister = !userIsAlreadyRegistered && !loading && showUserRegistrationWorkflow;
    if (showRegister) return <Register show={true} onHide={::this.hideRegistrationWorkflowModals} />;

    return null;
  }
}

export default compose(
  viewUserByWalletQuery,
  graphql(localQueries.root)
)(Web3);
