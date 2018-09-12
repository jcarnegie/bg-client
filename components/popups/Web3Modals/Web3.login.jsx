import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import BGModal from '@/components/modal';
import LoginToWeb3 from '@/components/LoginToWeb3';


export default class Web3LoginPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
  };

  render() {
    const { show, onHide } = this.props;

    return (
      <BGModal show={show} className="metamask-login" onHide={onHide}>
        <Modal.Body>
          {LoginToWeb3}
        </Modal.Body>
      </BGModal>
    );
  }
}
