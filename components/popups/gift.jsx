import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Thumbnail } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import {
  compose,
  graphql,
} from 'react-apollo';

import {
  localQueries,
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import BGModal from '@/components/modal';
import withFormHelper from '@/components/inputs/withFormHelper';
import InputGroupValidation from '@/components/inputs/input.group.validation';
import { wallet } from '@/shared/constants/placeholder';
import nftABI from '@/shared/contracts/ERC721/abi.json';
import { GIFT_ADD_SUCCESS, GIFT_ADD_ERROR, GIFT_ADD_LOADING, MESSAGE_ADD } from '@/shared/constants/actions';


@injectIntl
@withFormHelper
class GiftPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    user: PropTypes.object,
    formData: PropTypes.object,
    onChange: PropTypes.func,
    onHide: PropTypes.func,
    dispatch: PropTypes.func,
    item: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    intl: intlShape,
  };

  state = {};

  onSubmit(e) {
    e.preventDefault();

    if (!this.isValid()) {
      return false;
    }

    this.transfer();
  }

  transfer() {
    const { data, user, item, game, onHide, dispatch, formData } = this.props;
    const { gas, network } = data;
    dispatch({
      type: GIFT_ADD_LOADING,
    });
    /* TODO - move to shared/utils/contracts.js */
    const contract = window.web3.eth.contract(nftABI).at(game.nft[network.data.id]);
    contract.safeTransferFrom(user.viewUserByWallet.wallet, formData.wallet, item.tokenId, {
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(gas.data.average),
      },
      (error, tx) => {
        if (error) {
          dispatch({
            type: GIFT_ADD_ERROR,
          });
          dispatch({
            type: MESSAGE_ADD,
            payload: error,
          });
        } else {
          dispatch({
            type: GIFT_ADD_SUCCESS,
            payload: {
              item: item.tokenId,
              game: game.id,
              tx,
            },
          });
        }
        onHide();
      }
    );
  }

  isValid() {
    const { intl, formData } = this.props;

    let e;
    let isValid = true;
    for (let i in formData) {
      switch (i) {
        case 'wallet':
          if (!window.web3.isAddress(formData[i])) {
            e = document.getElementsByName(i)[0];
            e.parentNode.parentNode.classList.add('has-error');
            e.setCustomValidity(intl.formatMessage({
              id: 'fields.wallet.invalid',
            }));
            isValid = false;
          }
          break;
        default:
          break;
      }
    }

    return isValid;
  }

  render() {
    const { show, onHide, item, formData, onChange } = this.props;

    return (
      <BGModal show={show} className="gift" onHide={onHide} backdropClassName="semi">
        <style jsx global>{`
          .gift .modal-header {
            border: 0;
            position: absolute;
            z-index: 1;
            right: 0;
          }
          .gift .thumbnail {
            padding: 0;
            border: 0;
            background-color: #E8EBF4;
            border-radius: 0;
          }
          .gift .thumbnail img {
            max-height: 160px;
            min-height: 160px;
          }
        `}</style>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <h2>{item.name}</h2>
            <br />

            <Thumbnail src={item.image} />
            <InputGroupValidation
              type="text"
              name="wallet"
              defaultValue={formData.wallet}
              onChange={onChange}
              placeholder={wallet}
              maxLength="42"
              minLength="42"
              required
            />
            <br />

            <Button type="submit" className="btn-block text-uppercase">
              <FormattedMessage id="buttons.send" />
            </Button>
          </Form>
        </Modal.Body>
      </BGModal>
    );
  }
}


export default compose(
  viewUserByWalletQuery,
  graphql(localQueries.root),
)(GiftPopup);
