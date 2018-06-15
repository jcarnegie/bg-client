import React, {Component} from "react";
import PropTypes from "prop-types";
import {Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage, FormattedHTMLMessage} from "react-intl";

import BGModal from "@/components/modal";


@connect(
  state => ({
    user: state.user,
    network: state.network,
  })
)
export default class SellPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
  };

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const {show, onHide} = this.props;

    return (
      <BGModal show={show} className="sell" onHide={onHide} backdropClassName="semi">
        <style jsx global>{`
          .sell .modal-header {
            border: 0;
            position: absolute;
            z-index: 1;
            right: 0;
          }
        `}</style>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <h2><FormattedMessage id="modals.sell.title" /></h2>
            <br />

            <p><FormattedMessage id="modals.sell.p1" /></p>

            <br />
            <br />

            <p className="note">
              <FormattedHTMLMessage id="modals.metamask-login.faq" />
            </p>
          </Form>
        </Modal.Body>
      </BGModal>
    );
  }
}
