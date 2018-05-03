import "./modal.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {ACCOUNT_CHANGED, ACCOUNT_ERROR, MESSAGE_ADD, NEW_BLOCK} from "../../../shared/constants/actions";


@connect(
  state => ({
    account: state.account,
    network: state.network
  })
)
export default class MetaMaskInstallPopup extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func
  };

  state = {
    interval: null
  };

  static isInstalled() {
    return typeof window !== "undefined" && window.web3;
  }

  componentDidMount() {
    if (MetaMaskInstallPopup.isInstalled()) {
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
    return (
      <Modal show={!MetaMaskInstallPopup.isInstalled()} className="metamask-install">
        <Modal.Body>
          <div>
            <h2><FormattedMessage id="modals.metamask-install.title" /></h2>
            <br />
            <p><FormattedMessage id="modals.metamask-install.p1" /></p>
            <p><FormattedMessage id="modals.metamask-install.p2" /></p>
            <br />
            <Form>
              <Button className="btn-block text-uppercase" href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                <FormattedMessage id="buttons.install" />
              </Button>
            </Form>
            <p className="note">
              <FormattedMessage id="modals.metamask-install.n1" />
              {" "}
              <Link to="/faq">
                <FormattedMessage id="modals.metamask-install.faq" />
              </Link></p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
