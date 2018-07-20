import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape } from 'react-intl';
import { compose, filter, isNil, map, not } from 'ramda';

import BGModal from '@/components/modal';
import { isValidItemCategory, itemStats } from '@/client/utils/item';

const notNil = compose(not, isNil);
@connect(
  state => ({
    network: state.network,
    gas: state.gas,
  })
)

export default class ItemPopup extends Component {
  static propTypes = {
    type: PropTypes.string,
    show: PropTypes.bool,
    network: PropTypes.object,
    gas: PropTypes.object,
    formData: PropTypes.object,
    onChange: PropTypes.func,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
    item: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    intl: intlShape,
  };

  static defaultProps = {
    onHide: () => {},
    onSubmit: () => {},
  }

  state = { sellPrice: '0 PLAT' };

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state);
    this.props.onHide();
  }

  handleChange(e) {
    this.setState({ sellPrice: e.target.value });
  }

  // transfer() {
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
  // };

  // isValid() {
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
  // }

  renderStats() {
    const { item } = this.props;
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
    const attributes = filter(notNil, Object.values(item.attrs || []).map(attr => typeof Object.values(attr)[0] === 'number' ? Object.values(attr)[1] : Object.values(attr)[0]));
    return (
      <div className="attrs">
        {attributes
          .filter(isValidItemCategory)
          .map(attribute =>
            <Badge key={'itemCard' + attribute}>
              {attribute}
            </Badge>
          )}
      </div>
    );
  }

  render() {
    const { show, onHide, item, type } = this.props;
    return (
      <div>
        <style global jsx>{`
          .buy form .btn {
            font-size: 1.1em;
            background-color: #314B88;
            color: #ffffff;
            border: 0;
            padding: 1.1em;
            border-radius: 2px;
            width: 80%;
            position: relative;
            left: 10%;
            margin-top: 310px;
          }
          .buy.modal-dialog {
            margin: auto;
            position: relative;
            width: 900px;
            height: 500px;
          }
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
            height: 70%;
            width: 70%;
          }
          .buy .modal-content .modal-body form{
            margin: 0px;
            width: 95%;
          }
          .buy .modal .modal-content h2 {
            font-weight: 500;
            font-size: 2em;
            margin-top: 0;
            text-align: left;
            width: 100%;
            margin-bottom: 18px;
          }
          .buy form .imageContainer {
            float: left;
            width: 50%;
          }
          .buy form .itemInfo {
            float: right;
            width: 50%;
            position: relative;
            top: 12px;
          }
          .buy form .itemInfo h2 {
            float: left;
            width: 80%;
          }
          .buy form .itemInfo .itemPrice{
            float: left;
            font-size: 1.4em;
            font-weight: 600;
            padding-bottom: 15px;
          }
          .buy form .itemInfo dl {
            display: grid;
            grid-template-columns: max-content auto;
            margin: 0 0 20px 0;
            width: 100%;
          }
          .buy form .itemInfo dl dt {
            grid-column-start: 1;
            display: inline-block;
            font-weight: 300;
            font-size: 1.1em;
            text-align: left;
          }
          .buy form .itemInfo dl dd {
            grid-column-start: 2;
            display: inline-block;
            font-weight: 300;
            font-size: 1.1em;
            width: 90px;
          }
          .buy form .sellBlock {
            float: left;
            width: 100%;
            height: 40px;
          }
          .buy form .sell-input {
            float: left;
            width: 37%;
            height: 100%;
            position: relative;
            left: 9%;
            height: 60px;
            border: none;
            border-bottom: 1px solid black;
            background-color: #F3F4FA;
          }
          .buy  form .btn-block-sell {
            float: right;
            width: 40%;
            position: relative;
            margin: 0;
            left: 0%;
            height: 60px;
          }
          .buy form .sell-text {
            float: left;
            width: 51%;
            text-align: left;
            position: relative;
            left: 9%;
          }
          .buy form .sell-disclaimer {
            float: left;
            width: 37%;
            text-align: left;
            position: relative;
            left: 9%;
            top: 20px;
          }
          .buy form .itemInfo .platToken{
            position: relative;
            bottom: 5px;
            height: 30px;
          }
          .buy  button .platToken{
            position: relative;
            bottom: 3px;
            height: 15px;
          }
          .buy .attrs {
            float: left;
            width: 80%;
          }
          .buy .attrs .badge {
            background-color: #E7EDFD;
            border: 1px solid #BECFFB;
            border-radius: 6px;
            color: #6A7CAC;
            font-weight: 300;
            font-size: 15px;
            line-height: 18px;
            cursor: pointer;
            margin-right: 8px;
            float: left;
            margin-bottom: 5px;
          }
        `}</style>
        <BGModal show={show} dialogClassName="buy" onHide={onHide} backdropClassName="semi">
          <Modal.Header closeButton />
          <Modal.Body>
            <Form onSubmit={::this.onSubmit}>
              <div className="imageContainer">
                <img src={item.image} className="buyImage" />
              </div>
              <div className="itemInfo">
                <h2>{item.name}</h2>
                <div className="itemPrice">
                {
                  type === 'sell'
                  ? null
                  : <>
                      <img src="/static/images/icons/plat.png" className="platToken" />{' ' + ' '}PLAT
                    </>
                }
                </div>
                {this.renderStats()}
                {this.renderAttributes()}
              </div>
              {
                type === 'renew'
                ? <Button type="submit" className="btn-block">
                  Renew Marketplace Expiration
                  </Button>
                : type === 'withdraw'
                ? <Button type="submit" className="btn-block">
                    Withdraw from Marketplace
                  </Button>
                : type === 'sell'
                ? (<div>
                    <div className="sell-text">
                      Sell for
                    </div>
                    <div className="sellBlock">
                      <input type="text" value={this.state.sellPrice} onChange={::this.handleChange} className="sell-input">
                      </input>
                      <Button type="submit" className="btn-block-sell">
                        Sell this Item
                      </Button>
                    </div>
                    <div className="sell-disclaimer">
                      BitGuild charges a X% fee on all trades.
                      You will get XXX PLAT for this price.
                    </div>
                  </div>)
                : <Button type="submit" className="btn-block">
                    BUY for <img src="/static/images/icons/plat.png" className="platToken" />{' '}PLAT
                  </Button>
              }
            </Form>
          </Modal.Body>
        </BGModal>
      </div>
    );
  }
}
