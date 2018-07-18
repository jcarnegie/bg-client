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

  state = { sellPrice: 0 };

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
    this.props.onHide();
  }

  handleChange(e) {
    this.setState({ sellPrice: event.target.value });
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
    const attributes = filter(notNil, Object.values(item.attrs || []).map(attr => Object.values(attr)[1]));
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
          .modal .modal-content {
            width: 1000px;
            height: 550px;
          }
          .modal .modal-content .modal-body form{
            margin: 0px;
            width: 95%;
          }
          form .imageContainer {
            float: left;
            width: 45%;
          }
          form .itemInfo {
            float: right;
            width: 50%;
            position: relative;
            top: 12px;
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
          form .sellBlock {
            float: left;
            width: 100%;
            height: 40px;
          }
          form .sell-input {
            float: left;
            width: 50%;
            height: 100%;
          }
          form .btn-block-sell {
            float: right;
            width: 40%;
          }
           form .sell-text {
            float: left;
            width: 100%;
            text-align: left;
          }
           form .sell-disclaimer {
              float: left;
              width: 50%;
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
            background-color: #E7EDFD;
            border: 1px solid #BECFFB;
            border-radius: 6px;
            color: #6A7CAC;
            font-weight: 300;
            font-size: 14px;
          }
        `}</style>
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
    );
  }
}
