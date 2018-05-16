import React, {Component} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import PropTypes from "prop-types";


export default class MetaMaskInstallPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
  };

  render() {
    const {show} = this.props;

    return (
      <Modal show={show} className="metamask-install">
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
              <FormattedHTMLMessage id="modals.metamask-install.faq" />
            </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
