import React, {Component} from "react";
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";


@connect(
  state => ({
    account: state.account
  })
)
export default class MetaMaskPopup extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func
  };

  state = {
    interval: null
  };

  isMetaMaskInstalled() {
    return typeof window !== "undefined" && window.web3;
  }

  componentDidMount() {
    if (this.isMetaMaskInstalled()) {
      this.setState({
        interval: setInterval(() => {
          if (window.web3.eth.accounts[0] !== this.props.account.wallet) {
            this.props.dispatch({
              type: "CHANGE_ACCOUNT",
              payload: {
                wallet: window.web3.eth.accounts[0]
              }
            });
          }
        }, 100)
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <Modal show={!this.isMetaMaskInstalled()}>
        <Modal.Body>
          You have to install <a href="https://metamask.io/" target="_blank" >MetaMask</a> to use this site.
        </Modal.Body>
      </Modal>
    );
  }
}
