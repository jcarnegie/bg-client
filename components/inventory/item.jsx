import React, {Component, Fragment} from "react";
import {Badge, Button, ButtonGroup, Col, Thumbnail} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {map} from "ramda";
import Gift from "../popups/gift";
import Sell from "../popups/sell";
import {isValidItemCategory, itemStats} from "../../client/utils/item";
import {connect} from "react-redux";


@connect(
  state => ({
    gifts: state.gifts,
  })
)
export default class Item extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    item: PropTypes.shape({
      game: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      categories: PropTypes.array,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    gifts: PropTypes.shape({
      item: PropTypes.number,
      game: PropTypes.string,
      tx: PropTypes.string,
    }),
    maxStats: PropTypes.number,
  };

  state = {
    gift: false,
    sell: false,
  };

  onShowSell(e) {
    e.preventDefault();
    this.setState({
      sell: true,
    });
  }

  onShowGift(e) {
    e.preventDefault();
    this.setState({
      gift: true,
    });
  }

  onHideSell() {
    this.setState({
      sell: false,
    });
  }

  onHideGift() {
    this.setState({
      gift: false,
    });
  }

  renderStats() {
    const {item, maxStats} = this.props;
    return (
      <dl style={{minHeight: maxStats * 20 + 1}}>
        {map(stat => (
          <Fragment key={stat.keyLan}>
            <dt>{stat.keyLan}<FormattedMessage id="components.colon" /></dt>
            <dd>{stat.value}</dd>
          </Fragment>
        ), itemStats(item))}
      </dl>
    );
  }

  renderCategories() {
    const {item, onClick} = this.props;
    return (
      <div className="categories">
       {(item.categories && item.categories.length) ? item.categories
          .filter(isValidItemCategory)
          .map(category =>
            <Badge onClick={onClick(item.game, [category])} key={category}>
              {category}
            </Badge>
          ) : null}
      </div>
    );
  }

  renderButtons() {
    const {gifts, item, game} = this.props;

    const gift = gifts.data.find(gift => gift.item === item.tokenId && gift.game === game._id);

    if (gift) {
      return (
        <div className="tx">
          <FormattedMessage id="pages.inventory.tx" />
        </div>
      );
    }

    return (
      <ButtonGroup justified>
        <Button href="#" onClick={::this.onShowSell} className="sell">
          <FormattedMessage id="buttons.sell" />
        </Button>
        <Button href="#" onClick={::this.onShowGift} className="gift">
          <FormattedMessage id="buttons.gift" />
        </Button>
      </ButtonGroup>
    );
  }

  render() {
    const {item, game} = this.props;

    return (
      <Col sm={6} md={4} lg={3} className="item">
        <style jsx global>{`
          .item {
            padding-left: 35px;
            padding-right: 35px;
          }
          .item .thumbnail {
            padding: 0;
            border: 0;
            background-color: #E8EBF4;
            border-radius: 0;
          }
          .item .thumbnail img {
            max-height: 100px;
            min-height: 100px;
          }
          .item .thumbnail .caption {
            padding: 0;
            background-color: #ffffff;
          }
          .item .thumbnail .caption h4 {
            font-size: 14px;
            font-weight: 500;
            background-color: #F4F6F9;
            padding: 10px 15px 5px 15px;
            margin: 0;
          }
          .item .thumbnail .caption dl {
            display: grid;
            grid-template-columns: max-content auto;
            font-size: 12px;
            background-color: #F4F6F9;
            padding: 0 15px 10px 15px;
            margin: 0;
          }
          .item .thumbnail .caption dl dt {
            grid-column-start: 1;
            font-weight: 300;
          }
          .item .thumbnail .caption dl dd {
            grid-column-start: 2;
            font-weight: 500;
            margin-left: 10px;
          }
          .item .thumbnail .caption .btn {
            font-size: 11px;
            text-transform: uppercase;
            line-height: 16px;
            border-radius: 0;
            border: 0;
          }
          .item .thumbnail .caption .btn.sell {
            font-weight: 300;
            color: #959EB4;
            background-color: #D4DAE9;
          }
          .item .thumbnail .caption .btn.sell:hover {
            background-color: #C7CDDE;
          }
          .item .thumbnail .caption .btn.gift {
            font-weight: 500;
            color: #ffffff;
            background-color: var(--link-color);
          }
          .item .thumbnail .caption .btn.gift:hover {
            background-color: var(--link-hover-color);
          }
          .item .thumbnail .caption .tx {
            height: 28px;
            line-height: 28px;
            color: #FF6845;
            font-weight: 500;
            font-size: 13px;
            text-align: center;
          }
          .item .thumbnail .caption .categories {
            margin-top: 10px;
          }
          .item .thumbnail .caption .categories .badge {
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
        <Gift show={this.state.gift} item={item} game={game} onHide={::this.onHideGift} />
        <Sell show={this.state.sell} item={item} game={game} onHide={::this.onHideSell} />
        <Thumbnail src={item.image}>
          <h4>{item.name}</h4>
          {this.renderStats()}
          {this.renderButtons()}
          {this.renderCategories()}
        </Thumbnail>
      </Col>
    );
  }
}
