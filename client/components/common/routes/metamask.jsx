import React, {Component} from "react";
import {Route} from "react-router";

import MetaMaskInstall from "../../popups/metamask.install";
import MetaMaskLogin from "../../popups/metamask.login";
import MetaMaskNetwork from "../../popups/metamask.network";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ACCOUNT_CHANGED, ACCOUNT_ERROR, MESSAGE_ADD, NEW_BLOCK} from "../../../../shared/constants/actions";


@connect(
  state => ({
    account: state.account,
    network: state.network
  })
)
export default class MetaMaskRoute extends Component {
  static propTypes = {
    account: PropTypes.object,
    network: PropTypes.object,
    dispatch: PropTypes.func
  };

  state = {
    interval: null
  };

  static isInstalled() {
    return typeof window !== "undefined" && window.web3;
  }

  componentDidMount() {
    if (MetaMaskRoute.isInstalled()) {
      this.setState({
        interval: setInterval(() => {
          if (window.web3.eth.accounts[0] !== this.props.account.wallet) {
            if (window.web3.eth.accounts.length) {
              this.props.dispatch({
                type: ACCOUNT_CHANGED,
                payload: {
                  wallet: window.web3.eth.accounts[0]
                }
              });
            } else if (this.props.account.isLoading || this.props.account.success) {
              this.props.dispatch({
                type: ACCOUNT_ERROR
              });
            }
          }
        }, 100)
      });

      window.web3.eth.filter("latest").watch((error, result) => {
        if (error) {
          console.error(error);
          this.props.dispatch({
            type: MESSAGE_ADD,
            payload: error
          });
        } else {
          this.props.dispatch({
            type: NEW_BLOCK,
            payload: result
          });
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const {network, account} = this.props;

    return (
      <Route render={({location}) => {
        if (location.pathname === "/" || location.pathname === "/faq") {
          return null;
        } else {
          return (
            <>
              <MetaMaskInstall show={!MetaMaskRoute.isInstalled()} />
              <MetaMaskLogin show={!account.isLoading && !account.success} />
              <MetaMaskNetwork show={!network.isLoading && network.success && !["1", "4"].includes(network.data.id)} />
            </>
          );
        }
      }} />
    );
  }
}
