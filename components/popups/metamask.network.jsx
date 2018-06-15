import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";

import BGModal from "@/components/modal";

export default class MetaMaskNetworkPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
  };

  render() {
    const {show} = this.props;

    return (
      <BGModal show={show} className="metamask-network">
        <Modal.Body>
          <div>
            <h2><FormattedMessage id="modals.metamask-network.title" /></h2>
            <br />
            <p><FormattedMessage id="modals.metamask-network.p1" /></p>
            <p className="note">
              <FormattedHTMLMessage id="modals.metamask-network.faq" />
            </p>
          </div>
        </Modal.Body>
      </BGModal>
    );
  }
}
