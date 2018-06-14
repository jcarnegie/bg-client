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
  USER_RESET,
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
    if (MetaMask.isInstalled()) {
      this.setState({
        interval: setInterval(() => {
          if (window.web3.eth.accounts[0] !== this.props.account.wallet) {
            const wallet = window.web3.eth.accounts.length ? window.web3.eth.accounts[0] : null;
              this.props.dispatch({
                type: ACCOUNT_CHANGED,
                payload: {wallet},
              });
            if (!wallet) {
              if (this.props.user.data) {
                log.info("Resetting user: ", window.web3.eth.accounts[0]);
                this.props.dispatch({type: USER_RESET});
              }

              if ((this.props.account.isLoading || this.props.account.success)) {
                this.props.dispatch({
                  type: ACCOUNT_ERROR,
                });
              }
            }
          }
        }, 500),
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
      return <MetaMaskInstall show />;
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
        <MetaMaskLogin show={showMetaMaskLogin} />
        <MetaMaskNetwork show={showNetwork} />
        <Register show={showRegister} onHide={() => this.props.dispatch({type: USER_SHOW_REGISTER_WORKFLOW, payload: false})} />
      </>
    );
  }
}

export default MetaMask;

