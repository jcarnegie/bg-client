import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";


@connect(
  state => ({
    modal: state.modal,
  })
)
class BGModal extends Component {
  static propTypes = {
    modal: PropTypes.shape({
      closeButton: PropTypes.bool,
      title: PropTypes.any,
      body: PropTypes.any,
    }),
  };

  static defaultProps = {
    closeButton: true,
    title: "",
    modal: null,
  };

  render() {
    const {modal} = this.props;

    if (!modal) return null;

    return (
      <Modal show={modal.show !== false}>
        <Modal.Header closeButton={modal.closeButton}>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.body}
        </Modal.Body>
      </Modal>
    );
  }
}

export default BGModal;
