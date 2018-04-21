import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {MESSAGE_ADD, NEW_BLOCK, CHANGE_ACCOUNT} from "../../../shared/constants/actions";


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
              type: CHANGE_ACCOUNT,
              payload: {
                wallet: window.web3.eth.accounts.length ? window.web3.eth.accounts[0] : void 0
              }
            });
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
    return (
      <Modal show={!this.isMetaMaskInstalled()}>
        <Modal.Body>
          <h2>Welcome to BitGuild</h2>
          <p>To enter BitGuild, you will need to install MetaMask, a digital wallet. </p>
          <p>This will also act as your login to the game (no extra password needed).</p>
          <Button className="btn-block text-uppercase" href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Install MetaMask</Button>
          <p>Questions? <a href="#">FAQ</a></p>
        </Modal.Body>
      </Modal>
    );
  }
}
