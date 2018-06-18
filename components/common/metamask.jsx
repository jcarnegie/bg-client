import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import * as log from "loglevel";
import {withRouter} from "next/router";

import {
  ACCOUNT_CHANGED,
  ACCOUNT_ERROR,
  MESSAGE_ADD,
  NEW_BLOCK,
  SIGN_OUT_USER,
  USER_SHOW_REGISTER_WORKFLOW,
} from "@/shared/constants/actions";

import networkConfig from "@/client/utils/network";

import MetaMaskInstall from "@/components/popups/metamask.install";
import MetaMaskLogin from "@/components/popups/metamask.login";
import MetaMaskNetwork from "@/components/popups/metamask.network";
import Register from "@/components/popups/register";


@injectIntl
@withRouter
@connect(
  state => ({
    account: state.account,
    network: state.network,
    user: state.user,
  })
)
class MetaMask extends Component {
  static propTypes = {
    account: PropTypes.object,
    router: PropTypes.object,
    network: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    pathname: PropTypes.string,
  };

  state = {
    interval: null,
  };

  static getInitialProps(ctx) {
    let props = {};
    if (ctx && ctx.req) props.pathname = ctx.req.originalUrl;
    return props;
  }

  static isInstalled() {
    return typeof window !== "undefined" && window.web3;
  }

  componentDidMount() {
    const {dispatch} = this.props;
    if (MetaMask.isInstalled()) {
      this.setState({
        interval: setInterval(() => {
          const web3EthWallets = window.web3.eth.accounts;
          const web3EthWallet = web3EthWallets[0];
          const web3AccountSignedIn = Boolean(web3EthWallets.length);
          const accountInStoreDoesNotMatchWeb3Account = Boolean(web3EthWallet !== this.props.account.wallet);

          /* Update stored account if wallet do not match web3 account */
          if (web3AccountSignedIn && accountInStoreDoesNotMatchWeb3Account) {
            log.info(`User will be updated in store in because a web3 account exists and ${
              this.props.account.wallet ? "the stored account.wallet does not match" : "no account.wallet is stored"
            }.`);
            dispatch({
              type: ACCOUNT_CHANGED,
              payload: {wallet: web3EthWallet},
            });
            /* Log account error if we register account success while wallet is falsy */
            if (!this.props.account.wallet && this.props.account.success) dispatch({type: ACCOUNT_ERROR});
            return;
          }

          /* Sign out user if accounts do not match, or if stored account is signed out in web3 */
          if (!web3AccountSignedIn && accountInStoreDoesNotMatchWeb3Account && this.props.account.wallet) {
            log.info("User will be removed from store because the web3 account does not match the stored value.");
            dispatch({type: SIGN_OUT_USER});
          }
        }, 200),
      });

      window.web3.eth.filter("latest").watch((error, result) => {
        if (error) {
          this.props.dispatch({
            type: MESSAGE_ADD,
            payload: error,
          });
        } else {
          this.props.dispatch({
            type: NEW_BLOCK,
            payload: result,
          });
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  hideRegistrationWorkflowModals() {
    return this.props.dispatch({type: USER_SHOW_REGISTER_WORKFLOW, payload: false});
  }

  render() {
    const {network, account, pathname, router, user} = this.props;
    const whitelist = [
      "/",
      "/faq",
      "/airdrop",
    ];

    const path = pathname || router.pathname;

    if (!path || (whitelist.includes(path) && !user.showRegisterWorkflow)) {
      return null;
    }

    if (user.showRegisterWorkflow && !MetaMask.isInstalled()) {
      return <MetaMaskInstall show onHide={::this.hideRegistrationWorkflowModals} />;
    }

    const onSupportedNetwork = network.data && network.data.id && Object.keys(networkConfig).includes(network.data.id);
    const networkLoadedSuccess = !network.isLoading && network.success;
    const showNetwork = networkLoadedSuccess && !onSupportedNetwork;
    const showMetaMaskLogin = !account.isLoading && !account.success;
    const showRegister = !showNetwork && !showMetaMaskLogin && (
      user.showRegisterWorkflow || (
        networkLoadedSuccess && onSupportedNetwork && !user.isLoading && !user.success
      )
    );

    return (
      <>
        <MetaMaskLogin show={showMetaMaskLogin} onHide={::this.hideRegistrationWorkflowModals} />
        <MetaMaskNetwork show={showNetwork} onHide={::this.hideRegistrationWorkflowModals} />
        <Register show={showRegister} onHide={::this.hideRegistrationWorkflowModals} />
      </>
    );
  }
}

export default MetaMask;

