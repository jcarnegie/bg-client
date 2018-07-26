import React, { Component, Fragment } from 'react';
import { Badge, Button, ButtonGroup, Col, Thumbnail } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose, filter, isNil, map, not, path } from 'ramda';
import { connect } from 'react-redux';
import * as log from 'loglevel';

import {
  getMarketplaceContractAddress,
  getMarketplaceContract,
  getBitGuildTokenContract,
  getERC721ConformingContract,
  getContractFromGame,
} from '@/shared/utils/network';

import {
  buyItem,
  listItem,
  extendItem,
  withdrawItem,
} from '@/shared/utils/contracts';

import {
  listingIsExpiredForItem,
} from '@/shared/utils/marketplace';

import { USER_SHOW_REGISTER_WORKFLOW } from '@/shared/constants/actions';
import { isValidItemCategory, itemStats } from '@/client/utils/item';
import style from '@/shared/constants/style';

import Gift from '@/components/popups/gift';
import ItemPopup from '@/components/popups/itempopup';

import { featureOn } from '@/shared/utils';

const notNil = compose(not, isNil);

const inProgressBar = txt => (
  <div className="in-progress-bar">
    <style jsx>{`
          .in-progress-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #F68F11;
            font-size: 0.9em;
            opacity: 1;
            height: 45px;
            width: 100%;
            border: 0;
            font-weight: 100;
            outline: 0;
            text-transform: uppercase;
          }
        `}</style>
    <FormattedMessage id={`pages.inventory.${txt}`} />
  </div>
);
@injectIntl
class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
      saleExpiration: PropTypes.string,
      saleState: PropTypes.string,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    maxStats: PropTypes.number,
    buttons: PropTypes.any,
    className: PropTypes.string,
  };

  static defaultProps = {
    buttons: null,
    className: '',
  }

  expiredBanner() {
    let { saleExpiration, saleState } = this.props.item;

    if (!featureOn('marketplace')) return null;

    if (saleState !== 'listed') {
      return (
        <div className="expired-banner">
          <style jsx>{`
          .expired-banner {
            min-height: 21px;
          }
        `}</style>
        </div>
      );
    }

    const msInOneDay = 24 * 60 * 60 * 1000;
    const expirationDate = new Date(saleExpiration);
    const today = new Date();
    const diff = expirationDate - today;
    const days = Math.round(diff / msInOneDay);

    return (
      <div className="expired-banner">
        <style jsx>{`
          .expired-banner {
            color: white;
            background: linear-gradient(to right, #5989F8, #8BC8FF);
            font-size: 11px;
            padding: 3px 15px;
            letter-spacing: 1px;
          }
        `}</style>
        {diff <= 0 ? <FormattedMessage id="global.expired" /> : (
          <>
            <FormattedMessage id="pages.marketplace.expires-in" /> {days} {days > 1 ? <FormattedMessage id="pages.marketplace.days" /> : <FormattedMessage id="pages.marketplace.day" />}
          </>
        )}
      </div>
    );
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
            <Badge key={'item' + attribute}>
              {attribute}
            </Badge>
          )}
      </div>
    );
  }

  render() {
    const { item, className } = this.props;
    return (
      <Col sm={6} md={4} lg={3} className={`item ${className}`}>
        <style jsx global>{`
          .item {
            width: 275px;
            height: 500px;
          }
          .item .thumbnail {
            padding: 0;
            border: 0;
            background-color: #FAFAFA;
            border-radius: 6px;
            box-shadow: ${style.boxShadow.wide};
          }
          .item .thumbnail .itemImage {
            display: block;
            margin: auto auto;
            height: 100%;
            width: 100%;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
          }
          .item .thumbnail .caption {
            padding: 0;
            background-color: #ffffff;
            border-radius: 6px;
            box-shadow: 0px 0px 20px 10px #EAECF0;
          }
          .item .thumbnail .caption h4 {
            font-size: 1.1em;
            font-weight: 500;
            background-color: #F4F6F9;
            padding: 10px 15px 3px 15px;
            margin: 0;
          }
          .item .thumbnail .caption dl {
            font-size: 13px;
            display: grid;
            grid-template-columns: minmax(0%, 30%);
            background-color: #F4F6F9;
            padding: 5px 15px 3px 15px;
            margin: 0;
            columns: 4;
            min-height: 52px;
          }
          .item .thumbnail .caption dl dt {
            grid-column-start: 1;
            display: inline-block;
            font-weight: 300;
            font-size: 1.2em;
          }
          .item .thumbnail .caption dl dt:nth-of-type(even) {
            grid-column-start: 3;
            display: inline-block;
            font-weight: 300;
            font-size: 1.2em;
          }
          .item .thumbnail .caption dl dd {
            grid-column-start: 2;
            display: inline-block;
            font-weight: 300;
            font-size: 15px;
          }
          .item .thumbnail .caption dl dd:nth-of-type(even)  {
            grid-column-start: 4;
            display: inline-block;
            font-weight: 500;
            margin-left: 5px;
          }
          .item .thumbnail .caption .btn {
            font-size: 11px;
            line-height: 16px;
            border-radius: 0;
            border: 0;
          }
          .item .thumbnail .caption .btn.buy {
            height: 45px;
            font-weight: 500;
            color: #ffffff;
            background-color: rgb(49, 75, 136);
            font-size: 14px;
            border-radius: 0px 0px 6px 6px;
          }
          .item .thumbnail .caption .btn.buy:hover {
            background-color: rgb(83, 110, 173);
          }
          .item .thumbnail .platToken {
            display: inline-block;
            height: 25px;
            width: auto;
            padding: 0px 5px 4px 5px;
            line-height: 16px;
            margin-top: 4px;
          }
          .item .thumbnail .caption .tx {
            height: 28px;
            line-height: 28px;
            color: #FF6845;
            font-weight: 500;
            font-size: 13px;
            text-align: center;
          }
          .item .thumbnail .caption .attrs {
            background-color: #F4F6F9;
            min-height: 75px;
            padding: 5px 0px 8px 15px;
          }
          .item .thumbnail .caption .attrs .badge {
            margin-right: 8px;
            margin-bottom: 5px;
            background-color: #E7EDFD;
            border: 1px solid #BECFFB;
            border-radius: 6px;
            color: #6A7CAC;
            font-weight: 300;
            font-size: 15px;
            line-height: 18px;
            cursor: pointer;
            max-width: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .buy-for {
            vertical-align: middle;
          }
        `}</style>
        <Thumbnail>
          <img src={item.image} className="itemImage" />
          {::this.expiredBanner()}
          <h4>{item.name}</h4>
          {this.renderStats()}
          {this.renderAttributes()}
          {this.props.buttons ? this.props.buttons : null}
        </Thumbnail>
      </Col>
    );
  }
}


@connect(
  state => ({
    account: state.account,
    network: state.network,
    user: state.user,
  })
)
class MarketplaceItem extends Component {
  static propTypes = {
    account: PropTypes.object,
    network: PropTypes.object,
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    maxStats: PropTypes.number,
    user: PropTypes.object,
  };

  state = {
    buy: false,
  };

  onShowBuy(e) {
    e.preventDefault();
    if (!this.props.user.data) {
      return this.props.dispatch({ type: USER_SHOW_REGISTER_WORKFLOW, payload: true });
    }

    this.setState({ buy: true });
  }

  onHideBuy() {
    this.setState({ buy: false });
  }

  async onSubmit() {
    const { network, game, item, user } = this.props;

    const results = await buyItem({
      network,
      user,
      item,
      price: parseFloat(item.salePrice || 0, 10),
      contract: getContractFromGame(game, network),
    });
    log.info('Instantiating buy transaction...');
  }

  async onSubmitSwitch(type) {
    if (type === 'renew') {
      const { network, game, item } = this.props;

      const result = await extendItem({
        contract: getContractFromGame(game, network),
        network,
        item,
      });
    } else if (type === 'withdraw') {
      const { network, game, item } = this.props;

      const result = await withdrawItem({
        network,
        contract: getContractFromGame(game, network),
        item,
      });
    }
  }

  actionButton(side = 'left', onClick = () => { }, children) {
    return (
      <button onClick={onClick} className={`item-button item-button-${side}`}>
        <style jsx>{`
          .item-button {
            color: white;
            font-size: 0.9em;
            opacity: 1;
            height: 45px;
            width: 50%;
            border: 0;
            font-weight: 100;
            outline: 0;
            text-transform: uppercase;
          }
          .item-button:hover {
            opacity: 0.9;
            color: white;
          }
          .item-button-left, .item-button-left:hover, .item-button-left:focus {
            border-bottom-left-radius: 6px;
            background-color: rgb(59, 90, 149);
          }
          .item-button-right, .item-button-right:hover, .item-button-right:focus {
            background-color: rgb(80, 130, 206);
            border-bottom-right-radius: 6px;
          }
        `}</style>
        {children}
      </button>
    );
  }

  renewButton(side = 'left', onClick = () => ::this.onSubmitSwitch('renew'), children = <FormattedMessage id="pages.marketplace.renew" />) {
    return this.actionButton(side, onClick, children);
  }
  withdrawButton(side = 'right', onClick = () => ::this.onSubmitSwitch('withdraw'), children = <FormattedMessage id="pages.marketplace.withdraw" />) {
    return this.actionButton(side, onClick, children);
  }

  renderButtons() {
    const { item, user } = this.props;
    const lastOwner = path(['lastOwner', 'id'], item);
    const userID = path(['data', 'id'], user);
    return (
      <ButtonGroup justified>
        {lastOwner === userID
          ? <>
              {this.renewButton()}
              {this.withdrawButton()}
            </>
        : <Button href="#" onClick={::this.onShowBuy} className="buy">
          <span className="buy-for">
            <FormattedMessage className="buy-for" id="pages.marketplace.buy-for" />
          </span>
          <img src="/static/images/icons/plat.png" className="platToken" />
          <span className="buy-for">{item.salePrice ? item.salePrice : 0} PLAT</span>
        </Button>
        }
      </ButtonGroup>
    );
  }

  render() {
    const { item, game } = this.props;
    return (
      <>
        <ItemPopup
          show={this.state.buy}
          type="buy"
          item={item}
          game={game}
          onHide={::this.onHideBuy}
          onSubmit={::this.onSubmit}
        />
        <Item
          item={item}
          buttons={::this.renderButtons()}
        />
      </>
    );
  }
}

@connect(
  state => ({
    account: state.account,
    gas: state.gas,
    network: state.network,
    user: state.user,
  })
)
class InventoryItem extends Component {
  static propTypes = {
    account: PropTypes.object,
    gas: PropTypes.object,
    network: PropTypes.object,
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
      saleExpiration: PropTypes.string,
      saleState: PropTypes.string,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    maxStats: PropTypes.number,
    gifts: PropTypes.shape({
      data: PropTypes.array,
    }),
  };

  static defaultProps = {
    gifts: {
      data: null,
    },
  }

  state = {
    modal: null,
  };

  onHideModal() {
    this.setState({ modal: null });
  }

  async onSubmit(type) {
    if (type === 'renew') {
      const { network, game, item } = this.props;

      const result = await extendItem({
        contract: getContractFromGame(game, network),
        network,
        item,
      });
    } else if (type === 'withdraw') {
      const { network, game, item } = this.props;

      const result = await withdrawItem({
        network,
        contract: getContractFromGame(game, network),
        item,
      });
    }
  }

  async onSellSubmit(data) {
    const {
      account,
      network,
      item,
      game,
      user,
    } = this.props;

    log.info('Beginning sell transaction...');

    const result = await listItem({
      user,
      item,
      contract: getContractFromGame(game, network),
      to: getMarketplaceContractAddress(network),
      price: parseFloat(data.sellPrice),
    });
  }

  renderPresaleButton() {
    return (
      <Button style={{
        color: 'gold',
        backgroundColor: 'rgb(49,75,136)',
        height: '45px',
        width: '100%',
        focus: 0,
        cursor: 'default',
        borderBottomRightRadius: '6px',
        borderBottomLeftRadius: '6px',
      }}>PRESALE</Button>
    );
  }

  actionButton(side = 'left', onClick = () => {}, children) {
    return (
      <button onClick={onClick} className={`item-button item-button-${side}`}>
        <style jsx>{`
          .item-button {
            color: white;
            font-size: 0.9em;
            opacity: 1;
            height: 45px;
            width: 50%;
            border: 0;
            font-weight: 100;
            outline: 0;
            text-transform: uppercase;
          }
          .item-button:hover {
            opacity: 0.9;
            color: white;
          }
          .item-button-left, .item-button-left:hover, .item-button-left:focus {
            border-bottom-left-radius: 6px;
            background-color: rgb(59, 90, 149);
          }
          .item-button-right, .item-button-right:hover, .item-button-right:focus {
            background-color: rgb(80, 130, 206);
            border-bottom-right-radius: 6px;
          }
        `}</style>
        {children}
      </button>
    );
  }

  sellButton(side = 'left', onClick = () => ::this.setState({ modal: 'sell' }), children = <FormattedMessage id="global.sell" />) {
    return this.actionButton(side, onClick, children);
  }
  giftButton(side = 'right', onClick = () => ::this.setState({ modal: 'gift' }), children = <FormattedMessage id="global.gift" />) {
    return this.actionButton(side, onClick, children);
  }
  renewButton(side = 'left', onClick = () => ::this.onSubmit('renew'), children = <FormattedMessage id="pages.marketplace.renew" />) {
    return this.actionButton(side, onClick, children);
  }
  withdrawButton(side = 'right', onClick = () => ::this.onSubmit('withdraw'), children = <FormattedMessage id="pages.marketplace.withdraw" />) {
    return this.actionButton(side, onClick, children);
  }

  renderButtons() {
    const { gifts, item, game } = this.props;
    const gift = gifts.data && gifts.data.find(gift => gift.item === item.tokenId && gift.game === game.id);

    if (gift) {
      return (
        <div className="tx">
          <FormattedMessage id="pages.inventory.tx" />
        </div>
      );
    }

    let bottomBar = null;

    if (!featureOn('marketplace')) {
      bottomBar = (
        <>
          {this.sellButton()}
          {this.giftButton()}
        </>
      );
    } else {
      switch (item.saleState) {
        case 'listed':
          if (listingIsExpiredForItem(item)) {
            bottomBar = (
              <>
                {this.renewButton()}
                {this.withdrawButton()}
              </>
            );
          } else {
            bottomBar = inProgressBar('listed-for-sale');
          }
          break;
        case 'salepending':
          bottomBar = inProgressBar('sale-in-progress');
          break;
        case 'listpending':
          bottomBar = inProgressBar('list-in-progress');
          break;
        case 'withdrawpending':
          bottomBar = inProgressBar('extend-in-progress');
          break;
        case 'extendpending':
          bottomBar = inProgressBar('withdraw-in-progress');
          break;
        case 'sold':
          bottomBar = (
            <>
              {this.sellButton()}
              {this.giftButton()}
            </>
          );
          break;
        default:
          bottomBar = null;
      }
    }

    return (
      <div className="item-button-bar">
        <style jsx>{`
          .item-button-bar {
            width: 100%;
          }
        `}</style>
        {bottomBar}
      </div>
    );
  }

  render() {
    const { item, game } = this.props;
    return (
      <>
        <Gift
          show={this.state.modal === 'gift'}
          item={item} game={game} onHide={::this.onHideModal} />
        <ItemPopup
          show={this.state.modal === 'sell'}
          type="sell"
          item={item}
          game={game}
          onHide={::this.onHideModal}
          onSubmit={::this.onSellSubmit}
        />
        <ItemPopup
          show={this.state.modal === 'renew'}
          type="renew"
          item={item}
          game={game}
          onHide={::this.onHideModal}
          onSubmit={::this.onSubmit}
        />
        <ItemPopup
          show={this.state.modal === 'withdraw'}
          type="withdraw"
          item={item}
          game={game}
          onHide={::this.onHideModal}
          onSubmit={::this.onSubmit}
        />
        <Item
          item={item}
          buttons={item.presale ? ::this.renderPresaleButton() : ::this.renderButtons()}
        />
      </>
    );
  }
}


export {
  Item,
  MarketplaceItem,
  InventoryItem,
};
