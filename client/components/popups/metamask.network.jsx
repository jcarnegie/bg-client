import "./modal.less";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";


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
              <FormattedMessage id="modals.metamask-network.n1" />
              {" "}
              <Link to="/faq">
                <FormattedMessage id="modals.metamask-network.faq" />
              </Link>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
