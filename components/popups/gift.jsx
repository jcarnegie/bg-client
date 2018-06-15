import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Form, Modal, Thumbnail} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl, intlShape} from "react-intl";

import BGModal from "@/components/modal";
import withFormHelper from "@/components/inputs/withFormHelper";
import InputGroupValidation from "@/components/inputs/input.group.validation";
import {wallet} from "@/shared/constants/placeholder";
import nftABI from "@/shared/contracts/ERC721";
import {GIFT_ADD_SUCCESS, GIFT_ADD_ERROR, GIFT_ADD_LOADING, MESSAGE_ADD} from "@/shared/constants/actions";


@injectIntl
@withFormHelper
@connect(
  state => ({
    user: state.user,
    network: state.network,
    gas: state.gas,
  })
)
export default class GiftPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    user: PropTypes.object,
    network: PropTypes.object,
    gas: PropTypes.object,
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
    const {network, gas, user, item, game, onHide, dispatch, formData} = this.props;

    dispatch({
      type: GIFT_ADD_LOADING,
    });
    const contract = window.web3.eth.contract(nftABI).at(game.nft[network.data.id]);
    contract.safeTransferFrom(user.data.wallet, formData.wallet, item.tokenId, {
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
    const {intl, formData} = this.props;

    let e;
    let isValid = true;
    for (let i in formData) {
      switch (i) {
        case "wallet":
          if (!window.web3.isAddress(formData[i])) {
            e = document.getElementsByName(i)[0];
            e.parentNode.parentNode.classList.add("has-error");
            e.setCustomValidity(intl.formatMessage({
              id: "fields.wallet.invalid",
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
    const {show, onHide, item, formData, onChange} = this.props;

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
