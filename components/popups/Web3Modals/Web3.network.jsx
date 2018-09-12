import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import BGModal from '@/components/modal';
import NetworkNotSupported from '@/components/NetworkNotSupported';


export default class Web3NetworkPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
  };

  render() {
    const { show, onHide } = this.props;

    return (
      <BGModal show={show} className="metamask-network" onHide={onHide}>
        <Modal.Body>
          {NetworkNotSupported}
        </Modal.Body>
      </BGModal>
    );
  }
}
