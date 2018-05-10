import "./modal.less";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage, FormattedHTMLMessage} from "react-intl";


@connect(
  state => ({
    network: state.network
  })
)
export default class MetaMaskNetworkPopup extends Component {
  static propTypes = {
    network: PropTypes.object
  };

  render() {
    const {network} = this.props;

    return (
      <Modal show={!network.isLoading && network.success && !["1", "4"].includes(network.data.id)} className="metamask-network">
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
      </Modal>
    );
  }
}
