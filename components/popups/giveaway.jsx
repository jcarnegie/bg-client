import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';

import BGModal from '@/components/modal';
import BGButton from '@/components/bgbutton';

@injectIntl
class GiveawayModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
  };

  static defaultProps = {
    show: false,
    onHide: () => { },
  };

  render() {
    const { show, onHide } = this.props;

    return (
      <BGModal show={show} className="giveaway" onHide={onHide} backdropClassName="semi">
        <style jsx global>{`
          .giveaway .modal-header {
            border: 0;
            position: absolute;
            z-index: 1;
            right: 0;
          }
          .giveaway .modal-body {
            font-size: 24px;
          }
          .giveaway .modal-footer {
            text-align: center;
          }
        `}</style>
        <Modal.Header closeButton />
        <Modal.Body>
          <FormattedMessage id="modals.giveaway" />
        </Modal.Body>
        <Modal.Footer>
          <BGButton onClick={onHide}>OK</BGButton>
        </Modal.Footer>
      </BGModal>
    );
  }
}

export default GiveawayModal;
