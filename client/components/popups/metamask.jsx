import "./modal.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {CHANGE_ACCOUNT, MESSAGE_ADD, NEW_BLOCK} from "../../../shared/constants/actions";


@connect(
  state => ({
    account: state.account,
    network: state.network
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

  static isMetaMaskInstalled() {
    return typeof window !== "undefined" && window.web3;
  }

  componentDidMount() {
    if (MetaMaskPopup.isMetaMaskInstalled()) {
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
      <Modal show={!MetaMaskPopup.isMetaMaskInstalled()} className="metamask">
        <Modal.Body>
          <div>
            <h2>Hello!</h2>
            <br />
            <p>To enter BitGuild, you will need to install MetaMask, a digital wallet.</p>
            <p>This will also act as your login to the game (no extra password needed).</p>
            <br />
            <Form>
              <Button className="btn-block text-uppercase" href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                Install MetaMask
              </Button>
            </Form>
            <p className="note">Questions? <Link to="/faq">FAQ</Link></p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
