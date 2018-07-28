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
    layout: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.priceInput = React.createRef();
  }

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
    const { type } = this.props;
    if (type === 'sell' && (!sellPrice || (parseInt(sellPrice) < 1 || parseInt(sellPrice) > 10000000 || sellPrice === ''))) {
      if (!sellPrice || sellPrice === '') {
        this.setState({ sellPrice: 'Please enter a value' });
        this.priceInput.current.className = 'sell-input-error';
      } else if (parseInt(sellPrice) < 1) {
        this.setState({ sellPrice: 'Please enter a value above 0' });
        this.priceInput.current.className = 'sell-input-error';
      } else if (parseInt(sellPrice) > 10000000) {
        this.setState({ sellPrice: 'Please enter a value less than 10M' });
        this.priceInput.current.className = 'sell-input-error';
      }
    } else {
      this.props.onSubmit(this.state);
      this.props.onHide();
    }
  }

  handleChange(e) {
    this.setState({ sellPrice: e.target.value });
  }

  handleError() {
    if (this.state.sellPrice === 'Please enter a value' || this.state.sellPrice === 'Please enter a value above 0' || this.state.sellPrice === 'Please enter a value less than 10M') {
      this.setState({ sellPrice: '' });
      this.priceInput.current.className = 'sell-input';
    }
  }

  renderStats() {
    const { item, layout } = this.props;
    return (
      <dl className={layout.type.mobile ? 'mobileList' : ''}>
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
    const { item, layout } = this.props;
    const attributes = filter(notNil, Object.values(item.attrs || []).map(attr => typeof Object.values(attr)[0] === 'number' ? Object.values(attr)[1] : Object.values(attr)[0]));
    return (
      <div className={layout.type.mobile ? 'mobileAttrs' : 'attrs'}>
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
    const { network, show } = this.props;
    const { sellPrice } = this.state;
    console.log('getFeeAsync');
    if (!show || !network.data) return;

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
          .buy form .btn-block {
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
            height: 50px;
            margin-top: 260px;
          }
          .mobile-btn-block {
            font-size: 1em;
            padding: 0px;
            background-color: #314B88;
            color: #ffffff;
            border: 0;
            border-radius: 2px;
            width: 80%;
            position: relative;
            top: 10px;
            height: 40px;
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
            {/* height: 35%;
            width: 35%; */}
            margin-top: -30px;
          }
          .buyImage{
            height: 70%;
            width: 70%;
            margin-bottom: 15px;
          }
          .buy .modal-content .modal-body form{
            margin: 0px;
            width: 95%;
            height: 100%;
          }
          .buy .modal-content .modal-body {
            padding: 50px 10px;
            min-height: 310px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 430px;
          }
          .buy .modal-content h2 {
            font-weight: 500;
            font-size: 1.8em;
            margin-top: 0;
            text-align: center;
            width: 100%;
            margin-bottom: 15px;
          }
          .sell .modal-content h2 {
            font-weight: 500;
            font-size: 1.8em;
            margin-top: 0;
            text-align: center;
            width: 100%;
            margin-bottom: 5px;
          }
          .mobileItemInfo h2 {
            font-weight: 500;
            font-size: 1.6em;
            margin-top: 10px;
            text-align: center;
            width: 100%;
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
          .mobileItemInfo {
            width: 100%;
          }
          .buy form .itemInfo h2 {
            float: left;
            width: 80%;
            font-size: 1.6em;
          }
          .mobileItemName {
            font-weight: 500;
            font-size: 1.5em;
            margin-bottom: 0;
            text-align: center;
            position: relative;
            top: 15px;
          }
          .buy form .itemInfo .itemPrice {
            float: left;
            font-size: 1.2em;
            font-weight: 600;
            padding-bottom: 5px;
          }
          .buy form .itemInfo .itemPrice img {
            margin-right: 10px;
          }
          .mobileItemInfo .mobileItemPrice{
            font-size: 1.1em;
            font-weight: 600;
            padding-bottom: 10px;
          }
          .buy form .itemInfo dl {
            display: grid;
            grid-template-columns: max-content auto;
            margin: 0 0 10px 0;
            width: 100%;
          }
          .mobileItemInfo .mobileList {
            display: grid;
            grid-template-columns: minmax(20%, 0%);
            margin: 0 15px 15px auto;
            width: 80%;
            columns: 4;
            justify-content: center;
          }
         .sell .mobileItemInfo .mobileList {
            display: grid;
            grid-template-columns: minmax(20%,0%);
            margin: 0px 0px 10px 10px;
            width: 100%;
            -webkit-columns: 4;
            columns: 4;
            justify-content: center;
          }
          .buy form .itemInfo dl dt {
            grid-column-start: 1;
            display: inline-block;
            font-weight: 300;
            font-size: .8em;
            text-align: left;
          }
          .mobileList dt {
            grid-column-start: 1;
            display: inline-block;
            font-weight: 300;
            font-size: .9em;
            text-align: left;
          }
          .mobileList dt:nth-of-type(even) {
            grid-column-start: 3;
            display: inline-block;
            font-weight: 300;
            font-size: .9em;
            text-align: left;
          }
          .buy form .itemInfo dl dd {
            grid-column-start: 2;
            display: inline-block;
            font-weight: 300;
            font-size: .8em;
            width: 90px;
          }
          .mobileList dd {
            grid-column-start: 2;
            display: inline-block;
            font-weight: 300;
            font-size: .9em;
            width: 90px;
          }
          .mobileList dd:nth-of-type(even) {
            grid-column-start: 4;
            display: inline-block;
            font-weight: 300;
            font-size: .9em;
            width: 90px;
          }
          .buy form .sellBlock {
            float: left;
            width: 100%;
            height: 70px;
          }
          .buy form .sell-input-error {
            float: left;
            width: 37%;
            height: 100%;
            position: relative;
            left: 7.5%;
            height: 50px;
            border: none;
            border-bottom: 1px solid #D0021B;
            background-color: #FED6D3;
            font-size: .9em;
            color: #D0021B;
            padding-left: 10px;
          }
          .buy form .sell-input {
            float: left;
            width: 37%;
            height: 100%;
            position: relative;
            left: 7.5%;
            height: 50px;
            border: none;
            border-bottom: 1px solid black;
            background-color: #F3F4FA;
            font-size: .9em;
            padding-left: 10px;
          }
           .sell form .sell-input {
            float: left;
            width: 100%;
            height: 100%;
            position: relative;
            height: 50px;
            border: none;
            border-bottom: 1px solid black;
            background-color: #F3F4FA;
            margin-bottom: 10px;
            font-size: .9em;
          }
          .buy form .btn-block-sell {
            float: right;
            width: 38%;
            margin: 0;
            height: 50px;
            margin-right: 50px;
            line-height: 0px;
            font-size: 1em;
          }
          .sell form .btn-block-sell {
            float: right;
            width: 100%;
            margin: 0;
            height: 50px;
            margin-right: 0px;
            line-height: 0px;
            font-size: 1em;
          }
          .buy form .sell-text {
            float: left;
            width: 51%;
            text-align: left;
            position: relative;
            font-weight: 500;
            left: 7.5%;
            margin-right: 45px;
            font-size: .9em;
          }
          .sell form .sell-text {
            float: left;
            width: 100%
            text-align: left;
            position: relative;
            font-weight: 500;
            font-size: .9em;
          }
          .buy form .sell-disclaimer {
            float: left;
            width: 100%;
            text-align: left;
            position: relative;
            left: 7.5%;
            top: -10px;
            font-size: .7em;
            margin-top; 10px;
          }
          .sell form .sell-disclaimer {
            float: left;
            width: 100%;
            text-align: left;
            position: relative;
            top: -5px;
            font-size: .8em;
            margin-top; 10px;
            margin-bottom: 10px;
          }
          .buy form .itemInfo .platToken{
            position: relative;
            bottom: 2px;
            height: 30px;
          }
          .buy form .mobileItemInfo .platToken{
            position: relative;
            bottom: 2px;
            height: 25px;
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
          .mobileAttrs {
            float: left;
            width: 80%;
            margin-left: 30px;
          }
          .sell .mobileAttrs {
            margin-bottom: 10px;
            float: left;
            width: 100%;
            margin-left: 0px;
            justify-content: center;
          }
          .buy .attrs .badge {
            background-color: #E7EDFD;
            border: 1px solid #BECFFB;
            border-radius: 6px;
            color: #6A7CAC;
            font-weight: 300;
            font-size: .8em;
            line-height: 18px;
            margin-right: 8px;
            margin-bottom: 10px;
            float: left;
          }
          .mobileAttrs .badge {
            background-color: #E7EDFD;
            border: 1px solid #BECFFB;
            border-radius: 6px;
            color: #6A7CAC;
            font-weight: 300;
            font-size: .75em
            line-height: 18px;
            margin-right: 8px;
            margin-bottom: 5px;
          }
        `}</style>
        <BGModal show={show} dialogClassName={type === 'sell' && layout.type.mobile ? 'sell' : 'buy'} onHide={onHide} backdropClassName="semi">
          <Modal.Header closeButton />
          <Modal.Body>
            <Form onSubmit={::this.onSubmit}>
              {layout.type.mobile ? <img src={item.image} className="buyMobileImage" /> : null}
              <div className="imageContainer">
                {!layout.type.mobile ? <img src={item.image} className="buyImage" /> : null}
              </div>
              <div className={layout.type.mobile ? 'mobileItemInfo' : 'itemInfo'}>
                <h2>{item.name}</h2>
                <div className={layout.type.mobile ? 'mobileItemPrice' : 'itemPrice'}>
                {
                  type === 'sell'
                  ? null
                  : <>
                      <img src="/static/images/icons/plat.png" className="platToken" />{item.salePrice + ' '}PLAT
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
                      <input ref={this.priceInput} type="text" value={this.state.sellPrice} placeholder="0 PLAT" onChange={::this.handleChange} onClick={::this.handleError} className="sell-input">
                      </input>
                      {layout.type.mobile ? null
                      : <Button type="submit" className="btn-block-sell">
                          <FormattedMessage id="pages.marketplace.sell-this-item" />
                      </Button>
                      }
                    </div>
                    <div className="sell-disclaimer">
                      <FormattedMessage id="pages.marketplace.bitguild-fee-1" /><strong>{this.state.feePercentage}%</strong> <FormattedMessage id="pages.marketplace.bitguild-fee-2" />
                      <FormattedMessage id="pages.marketplace.bitguild-fee-3" />
                        <strong>{(this.state.sellPrice && this.state.fee) ? (parseInt(this.state.sellPrice) - this.state.fee) : '0'} PLAT </strong>
                      <FormattedMessage id="pages.marketplace.bitguild-fee-4" />
                    </div>
                    {!layout.type.mobile ? null
                      : <Button type="submit" className="btn-block-sell">
                          <FormattedMessage id="pages.marketplace.sell-this-item" />
                      </Button>
                    }
                  </div>)
                : <Button type="submit" className={layout.type.mobile ? 'mobile-btn-block' : 'btn-block'}>
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
