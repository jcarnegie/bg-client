import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape } from 'react-intl';
import { compose, filter, isNil, map, not } from 'ramda';
import ScaleLoader from 'react-spinners/dist/spinners/ScaleLoader';

import BGModal from '@/components/modal';
import { isValidItemCategory, itemStats } from '@/client/utils/item';

import {
  getFee,
} from '@/shared/utils/contracts';


const notNil = compose(not, isNil);
@connect(
  state => ({
    layout: state.layout,
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

  state = {
    sellPrice: '',
    feePercentage: null,
    fee: null,
  };

  onSubmit(e) {
    e.preventDefault();
    const { sellPrice } = this.state;
    if (!sellPrice || (parseInt(sellPrice) < 1)) {
      return;
    }
    this.props.onSubmit(this.state);
    this.props.onHide();
  }

  handleChange(e) {
    this.setState({ sellPrice: e.target.value });
  }

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

  async getFeeAsync() {
    const { network } = this.props;
    const { sellPrice } = this.state;

    if (!network.data) return;

    let price = sellPrice && parseInt(sellPrice, 10);

    if (!price) price = 0;

    const { feePercentage, fee } = await getFee({ network, price });
    this.setState({ feePercentage, fee });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sellPrice !== this.state.sellPrice) {
      this.getFeeAsync();
    }
  }

  componentDidMount() {
    this.getFeeAsync();
  }

  render() {
    const { show, onHide, item, type, layout } = this.props;
    return (
      <div>
        <style global jsx>{`
          .buy form .btn {
            font-size: 1em;
            padding: 0px !important;
            background-color: #314B88;
            color: #ffffff;
            border: 0;
            padding: 1.1em;
            border-radius: 2px;
            width: 80%;
            position: relative;
            left: 10%;
            height: 55px;
            margin-top: 275px;
          }
          .buy.modal-dialog {
            margin: auto;
            position: relative;
            width: 700px;
            height: 400px;
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
          .buyMobileImage {
            height: 100%;
            width: 100%;
          }
          .buyImage{
            height: 70%;
            width: 70%;
            margin-top: 20px;
          }
          .buy .modal-content .modal-body form{
            margin: 0px;
            width: 95%;
          }
          .buy .modal-content .modal-body {
            padding: 50px 10px;
            min-height: 310px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 400px;
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
            margin-top: 15px;
          }
          .buy form .itemInfo h2 {
            float: left;
            width: 80%;
            padding-bottom: 10px;
            font-size: 1.6em;
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
            height: 70px;
          }
          .buy form .sell-input {
            float: left;
            width: 37%;
            height: 100%;
            position: relative;
            left: 9%;
            height: 50px;
            border: none;
            border-bottom: 1px solid black;
            background-color: #F3F4FA;
          }
          .buy form .btn-block-sell {
            float: right;
            width: 38%;
            margin: 0;
            height: 50px;
            margin-right: 175px;
            line-height: 0px;
          }
          .buy form .sell-text {
            float: left;
            width: 51%;
            text-align: left;
            position: relative;
            font-weight: 500;
            left: 9%;
          }
          .buy form .sell-disclaimer {
            float: left;
            width: 37%;
            text-align: left;
            position: relative;
            left: 9%;
            top: -5px;
            font-size: .8em;
            margin-top; 10px;
          }
          .buy form .itemInfo .platToken{
            position: relative;
            bottom: 2px;
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
                <img src={item.image} className={layout.type.mobile ? 'buyMobileImage' : 'buyImage'} />
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
                      <FormattedMessage id="pages.marketplace.sell-for" />
                    </div>
                    <div className="sellBlock">
                      <input type="text" value={this.state.sellPrice} placeholder="0 PLAT" onChange={::this.handleChange} className="sell-input">
                      </input>
                      <Button type="submit" className="btn-block-sell">
                        <FormattedMessage id="pages.marketplace.sell-this-item" />
                      </Button>
                    </div>
                    <div className="sell-disclaimer">
                      <FormattedMessage id="pages.marketplace.bitguild-fee-1" /><strong>{this.state.feePercentage}%</strong> <FormattedMessage id="pages.marketplace.bitguild-fee-2" />
                      <FormattedMessage id="pages.marketplace.bitguild-fee-3" />
                        <strong>{(this.state.sellPrice && this.state.fee) ? (parseInt(this.state.sellPrice) - this.state.fee) : '0'} PLAT </strong>
                      <FormattedMessage id="pages.marketplace.bitguild-fee-4" />
                    </div>
                  </div>)
                : <Button type="submit" className="btn-block">
                    <FormattedMessage id="pages.marketplace.buy-for" /> <img src="/static/images/icons/plat.png" className="platToken" />{item.salePrice ? item.salePrice : 0} PLAT
                  </Button>
              }
            </Form>
          </Modal.Body>
        </BGModal>
      </div>
    );
  }
}
