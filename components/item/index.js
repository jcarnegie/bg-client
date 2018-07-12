import React, {Component, Fragment} from "react";
import {Badge, Button, ButtonGroup, Col, Thumbnail} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import {compose, filter, isNil, map, not} from "ramda";

import {isValidItemCategory, itemStats} from "@/client/utils/item";
import Gift from "@/components/popups/gift";
import Sell from "@/components/popups/sell";

const notNil = compose(not, isNil);


@injectIntl
class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
      // saleExpiration: PropTypes.number,
      // saleState: PropTypes.string,
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
    className: "",
  }

  expiredBanner() {
    let {saleExpiration, saleState} = this.props.item;

    // TODO - dev
    saleState = "listed";

    if (saleState !== "listed") return null;

    const expired = Math.random() > 0.5;
    const n = Math.round(Math.random() * 6);

    if (!saleExpiration) {
      const today = new Date();
      const fiveDays = new Date(today.getFullYear(), today.getMonth(), today.getDate() + n);
      saleExpiration = expired ? fiveDays : today;
    }

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
        {expired ? <FormattedMessage id="global.expired" /> : (
          <>
            <FormattedMessage id="global.expires-in" /> {n} <FormattedMessage id="global.days" />
          </>
        )}
      </div>
    );
  }

  renderStats() {
    const {item} = this.props;
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
    const {item} = this.props;
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
    const {item, className} = this.props;
    return (
      <Col sm={6} md={4} lg={3} className={`item ${className}`}>
        <style jsx global>{`
          .item {
            padding-left: 35px;
            padding-right: 35px;
          }
          .item .thumbnail {
            padding: 0;
            border: 0;
            background-color: #FAFAFA;
            border-radius: 6px;
          }
          .item .thumbnail img {
            height: 100%;
            width: 100%;
          }
          .item .thumbnail .caption {
            padding: 0;
            background-color: #ffffff;
            border-radius: 6px;
          }
          .item .thumbnail .caption h4 {
            font-size: 18px;
            font-weight: 500;
            background-color: #F4F6F9;
            padding: 10px 15px 5px 15px;
            margin: 0;
          }
          .item .thumbnail .caption dl {
            font-size: 13px;
            display: grid;
            grid-template-columns: max-content auto;
            background-color: #F4F6F9;
            padding: 5px 15px 5px 15px;
            margin: 0;
          }
          .item .thumbnail .caption dl dt {
            grid-column-start: 1;
            display: inline-block;
            font-weight: 300;
          }
           .item .thumbnail .caption dl dt:not(:first-child) {
            display: inline-block;
            font-weight: 300;
          }
          .item .thumbnail .caption dl dd {
            grid-column-start: 2;
            display: inline-block;
            font-weight: 500;
            margin-left: 5px;
          }
          .item .thumbnail .caption .btn {
            font-size: 11px;
            text-transform: uppercase;
            line-height: 16px;
            border-radius: 0;
            border: 0;
          }
          .item .thumbnail .caption .btn.buy {
            font-weight: 500;
            color: #ffffff;
            background-color: rgb(49, 75, 136);
            height: 40px;
            font-size: 14px;
            border-radius: 0px 0px 6px 6px;
          }
          .item .thumbnail .caption .btn.buy:hover {
            background-color: rgb(83, 110, 173);
          }
          .item .thumbnail .platToken {
            display: inline-block;
            height: auto;
            width: auto;
            padding: 0px 5px 4px 5px;
            line-height: 16px;
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
            padding: 5px 0px 10px 0px;
          }
          .item .thumbnail .caption .attrs {
            background-color: #F4F6F9;
          }
          .item .thumbnail .caption .attrs .badge:first-child {
            margin-right: 3px;
            margin-bottom: 5px;
            margin-left: 10px;
            background-color: #ffffff;
            border: 1px solid #C9C9C9;
            border-radius: 12px;
            color: #797979;
            font-weight: 300;
            font-size: 12px;
            line-height: 18px;
            cursor: pointer;
           }
          .item .thumbnail .caption .attrs .badge {
            margin-right: 3px;
            margin-bottom: 5px;
            background-color: #ffffff;
            border: 1px solid #C9C9C9;
            border-radius: 12px;
            color: #797979;
            font-weight: 300;
            font-size: 12px;
            line-height: 18px;
            cursor: pointer;
          }
        `}</style>
        <Thumbnail>
          <img src={item.image} />
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


class MarketplaceItem extends Component {
  static propTypes = {
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
  };

  state = {
    buy: false,
  };

  onShowBuy(e) {
    e.preventDefault();
    this.setState({buy: true});
  }

  onHideBuy() {
    this.setState({buy: false});
  }

  renderButtons() {
    const {item, game} = this.props;
    return (
      <ButtonGroup justified>
        <Button href="#" onClick={::this.onShowBuy} className="buy">
          Buy for<img src="/static/images/icons/plat.png" className="platToken" />{item.price.plat}
          {/* <FormattedMessage id="Buy" /> */}
        </Button>
      </ButtonGroup>
    );
  }

  render() {
    return (
      <Item
        item={this.props.item}
        buttons={::this.renderButtons()}
      />
    );
  }
}


class InventoryItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
      // saleExpiration: PropTypes.number,
      // saleState: PropTypes.string,
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
    gift: false,
    sell: false,
  };

  onShowSell(e) {
    this.setState({sell: true});
  }

  onShowGift(e) {
    e.preventDefault();
    this.setState({gift: true});
  }

  onHideSell() {
    this.setState({sell: false});
  }

  onHideGift() {
    this.setState({gift: false});
  }

  renderPresaleButton() {
    return (
      <Button style={{
        color: "gold",
        backgroundColor: "rgb(49,75,136)",
        width: "100%",
        focus: 0,
        cursor: "default",
      }}>PRESALE</Button>
    );
  }

  renderButtons() {
    const {gifts, item, game} = this.props;

    const gift = gifts.data && gifts.data.find(gift => gift.item === item.tokenId && gift.game === game.id);

    if (gift) {
      return (
        <div className="tx">
          <FormattedMessage id="pages.inventory.tx" />
        </div>
      );
    }

    return (
      <div className="item-button-bar">
        <style jsx>{`
          .item-button-bar {
            width: 100%;
          }
          .item-button {
            color: white;
            font-size: 0.9em;
            opacity: 1;
            height: 45px;
            width: 50%;
            border: 0;
            text-transform: uppercase;
            font-weight: 100;
            outline: 0;
          }
          .item-button:hover {
            opacity: 0.9;
            color: white;
          }
          .button-left, .button-left:hover, .button-left:focus {
            border-bottom-left-radius: 6px;
            background-color: rgb(59, 90, 149);
          }
          .button-right, .button-right:hover, .button-right:focus {
            background-color: rgb(80, 130, 206);
            border-bottom-right-radius: 6px;
          }
        `}</style>
        <button href="#" onClick={::this.onShowSell} className="item-button button-left">
          <FormattedMessage id="buttons.sell" />
        </button>
        <button href="#" onClick={::this.onShowGift} className="item-button button-right">
          <FormattedMessage id="buttons.gift" />
        </button>
      </div>
    );
  }

  render() {
    const {item, game} = this.props;
    return (
      <>
        <Gift show={this.state.gift} item={item} game={game} onHide={::this.onHideGift} />
        <Sell show={this.state.sell} item={item} game={game} onHide={::this.onHideSell} />
        <Item
          className="marketplace-item"
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
