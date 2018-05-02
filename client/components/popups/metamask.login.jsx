import "./modal.less";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";


@connect(
  state => ({
    account: state.account
  })
)
export default class MetaMaskPopup2 extends Component {
  static propTypes = {
    account: PropTypes.object
  };

  render() {
    const {account} = this.props;

    return (
      <Modal show={!account.isLoading && !account.success} className="metamask-login">
        <Modal.Body>
          <div>
            <h2>You are not logged into MetaMask</h2>
            <br />
            <p>Please open MetaMask and follow the instructions to log in.</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
