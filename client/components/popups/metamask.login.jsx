import "./modal.less";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage, FormattedHTMLMessage} from "react-intl";


@connect(
  state => ({
    account: state.account
  })
)
export default class MetaMaskLoginPopup extends Component {
  static propTypes = {
    account: PropTypes.object
  };

  render() {
    const {account} = this.props;

    return (
      <Modal show={!account.isLoading && !account.success} className="metamask-login">
        <Modal.Body>
          <div>
            <h2><FormattedMessage id="modals.metamask-login.title" /></h2>
            <br />
            <p><FormattedMessage id="modals.metamask-login.p1" /></p>
            <p className="note">
              <FormattedHTMLMessage id="modals.metamask-login.faq" />
            </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
