import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
// import {injectIntl} from "react-intl";

import {ACCOUNT_CHANGED, ACCOUNT_ERROR, MESSAGE_ADD, NEW_BLOCK} from "../../shared/constants/actions";
import networkConfig from "../../client/utils/network";

import MetaMaskInstall from "../popups/metamask.install";
import MetaMaskLogin from "../popups/metamask.login";
import MetaMaskNetwork from "../popups/metamask.network";
import Register from "../popups/register";


// @injectIntl
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
            if (window.web3.eth.accounts.length) {
              this.props.dispatch({
                type: ACCOUNT_CHANGED,
                payload: {
                  wallet: window.web3.eth.accounts[0],
                },
              });
            } else if (this.props.account.isLoading || this.props.account.success) {
              this.props.dispatch({
                type: ACCOUNT_ERROR,
              });
            }
          }
        }, 100),
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
    const {network, account, pathname, user} = this.props;
    const whitelist = [
      "/faq",
      "/airdrop",
    ];

    if (!pathname || whitelist.includes(pathname)) {
      return null;
    }

    return (
      <>
        <MetaMaskInstall show={!MetaMask.isInstalled()} />
        <MetaMaskLogin show={!account.isLoading && !account.success} />
        <MetaMaskNetwork show={!network.isLoading && network.success && !Object.keys(networkConfig).includes(network.data.id)} />
        <Register show={!network.isLoading && network.success && Object.keys(networkConfig).includes(network.data.id) && !user.isLoading && !user.success} />
      </>
    );
  }
}

export default MetaMask;

