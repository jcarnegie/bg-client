import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import * as log from 'loglevel';
import { FormattedMessage, injectIntl } from 'react-intl';

import withFormHelper from '@/components/inputs/withFormHelper';
import BGModal from '@/components/modal';
import BGButton from '@/components/bgbutton';


@withFormHelper
@injectIntl
class SellPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    item: PropTypes.object,
  };

  static defaultProps = {
    show: false,
    onHide: () => {},
    item: {},
  };

  onSubmit() {
    log.info('Instantiating sell transaction...');
    ::this.props.onHide();
  }

  render() {
    const { show, onHide } = this.props;

    return (
      <BGModal show={show} className="sell" onHide={onHide} backdropClassName="semi" bsSize="lg">
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
          <FormattedMessage id="global.sell-for" />
          <BGButton onClick={() => {
            ::this.onSubmit();
          }}><FormattedMessage id="global.sell-this-item" /></BGButton>
        </Modal.Body>
      </BGModal>
    );
  }
}

export default SellPopup;
