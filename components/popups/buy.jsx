import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Badge, Button, Form, Modal, Thumbnail } from "react-bootstrap";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { compose, filter, isNil, map, not } from "ramda";

import BGModal from "@/components/modal";
import InputGroupValidation from "@/components/inputs/input.group.validation";
import {isValidItemCategory, itemStats} from "../../client/utils/item";

const notNil = compose(not, isNil);
@connect(
  state => ({
    network: state.network,
    gas: state.gas,
  })
)

export default class BuyPopup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    network: PropTypes.object,
    gas: PropTypes.object,
    formData: PropTypes.object,
    onChange: PropTypes.func,
    onHide: PropTypes.func,
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

    if (!this.isvalid()) {
      return false;
    }
    this.transfer();
  };

  transfer() {
    const {network, gas, user, item, game, onHide, formData} = this.props;
    onHide();
    // keeping for example
    // const contract = window.web3.eth.contract(nftABI).at(game.nft[network.data.id]);
    // contract.safeTransferFrom(user.data.wallet, formData.wallet, item.tokenId, {
    //   gas: window.web3.toHex(15e4),
    //   gasPrice: window.web3.toHex(gas.data.average),
    // },
    //   (error, tx) => {
    //     if (error) {
    //       dispatch({
    //         type: GIFT_ADD_ERROR,
    //       });
    //       dispatch({
    //         type: MESSAGE_ADD,
    //         payload: error,
    //       });
    //     } else {
    //       dispatch({
    //         type: GIFT_ADD_SUCCESS,
    //         payload: {
    //           item: item.tokenId,
    //           game: game.id,
    //           tx,
    //         },
    //       });
    //     }
    //     onHide();
    //   }
    // );
  };

  isValid() {
  // keeping for example
  //   const {intl, formData} = this.props;

  //   let e;
  //   let isValid = true;
  //   for (let i in formData) {
  //     switch (i) {
  //       case "wallet":
  //         if (!window.web3.isAddress(formData[i])) {
  //           e = document.getElementsByName(i)[0];
  //           e.parentNode.parentNode.classList.add("has-error");
  //           e.setCustomValidity(intl.formatMessage({
  //             id: "fields.wallet.invalid",
  //           }));
  //           isValid = false;
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   }

  //   return isValid;
  }

  renderStats() {
    const { item, maxStats } = this.props;
    return (
      <dl>
        {map(stat => (
          <Fragment key={stat.keyLan}>
            <dt>{stat.keyLan}<FormattedMessage id="components.colon" /></dt>
            <dd>{stat.value}</dd>
          </Fragment>
        ), itemStats(item))}
      </dl>
    );
  }

  renderAttributes() {
    const { item } = this.props;
    const attributes = filter(notNil, Object.values(item.attrs || []).map(attr => Object.values(attr)[1]));
    return (
      <div className="attrs">
        {attributes
          .filter(isValidItemCategory)
          .map(attribute =>
            <Badge key={attribute}>
              {attribute}
            </Badge>
          )}
      </div>
    );
  }

  render() {
    const {show, onHide, item, formData, onChange} = this.props;

    return(
       <BGModal show={show} className="buy" onHide={onHide} backdropClassName="semi">
        <style jsx global>{`
          .buy .modal-header {
            border: 0;
            position: absolute;
            z-index: 1;
            right: 0;
          }
          .buy .thumbnail {
            padding: 0;
            border: 0;
            background-color: #E8EBF4;
            border-radius: 0;
          }
          .buy .thumbnail img {
            max-height: 160px;
            min-height: 160px;
          }
          .buyImage{
            height: 100%;
            width: 100%;
          }
          .imageContainer {
            float: left;
            width: 50%;
          }
          .itemInfo {
            float: right;
            width: 45%;
            position: relative;
            top: 12px;
          }
          .modal .modal-content {
            width: 700px;
          }
          .modal .modal-content .modal-body form{
            margin: 0px;
            width: 75%;
          }
          form .itemInfo h2 {
            float: left
          }
          form .itemInfo .itemPrice{
            float: left;
            font-size: 20px;
            font-weight: 600
          }
          form .itemInfo dl {
            display: grid;
            grid-template-columns: max-content auto;
            margin: 0;
            width: 100%;
          }
          form .itemInfo dl dt {
            grid-column-start: 1;
            font-weight: 300;
            text-align: left;
          }
          form .itemInfo dl dd {
            grid-column-start: 2;
            margin-left: 10px;
            text-align: left;
          }
          form .itemInfo .platToken{
            position: relative;
            bottom: 5px;
            height: 30px;
          }
          button .platToken{
            position: relative;
            bottom: 3px;
            height: 15px;
          }
          .attrs{
            float: left;
          }
          .attrs .badge{
            color: #3B5998;
            background-color: #E7EDFD;
            font-weight: 200;
          }
        `}</style>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <div className="imageContainer">
              <img src={item.image} className="buyImage"/>
            </div>
            <div className="itemInfo">
              <h2>{item.name}</h2>
              <div className="itemPrice">
              <img src="/static/images/icons/plat.png" className="platToken" />{" " + item.price.plat + " "}PLAT
              </div>
              {this.renderStats()}
              {this.renderAttributes()}
            </div>
            <Button type="submit" className="btn-block">
            BUY for <img src="/static/images/icons/plat.png" className="platToken" />{" " + item.price.plat}PLAT
            </Button>
          </Form>
        </Modal.Body>
      </BGModal>
    );
  }
}
