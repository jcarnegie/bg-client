import "./modal.less";
import "./sell.less";
import "./form.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";


@connect(
  state => ({
    user: state.user,
    network: state.network
  })
)
export default class SellPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func
  };

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const {show, onHide} = this.props;

    return (
      <Modal show={show} className="sell" onHide={onHide} backdropClassName="semi">
        <Modal.Header closeButton />
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <h2><FormattedMessage id="modals.sell.title" /></h2>
            <br />

            <p><FormattedMessage id="modals.sell.p1" /></p>

            <br />
            <br />

            <p className="note">
              <FormattedMessage id="modals.metamask-login.n1" />
              {" "}
              <Link to="/faq">
                <FormattedMessage id="modals.metamask-login.faq" />
              </Link>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
