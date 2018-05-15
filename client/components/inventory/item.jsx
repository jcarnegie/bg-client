import "./item.less";
import React, {Component, Fragment} from "react";
import {Badge, Button, ButtonGroup, Col, Thumbnail} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {map} from "ramda";
import Gift from "../popups/gift";
import Sell from "../popups/sell";
import {isValidItemCategory, itemStats} from "../../utils/item";
import {connect} from "react-redux";


@connect(
  state => ({
    gifts: state.gifts
  })
)
export default class Item extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    item: PropTypes.shape({
      game: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      categories: PropTypes.array
    }),
    game: PropTypes.shape({
      nft: PropTypes.object
    }),
    gifts: PropTypes.shape({
      item: PropTypes.number,
      game: PropTypes.string,
      tx: PropTypes.string
    }),
    maxStats: PropTypes.number
  };

  state = {
    gift: false,
    sell: false
  };

  onShowSell(e) {
    e.preventDefault();
    this.setState({
      sell: true
    });
  }

  onShowGift(e) {
    e.preventDefault();
    this.setState({
      gift: true
    });
  }

  onHideSell() {
    this.setState({
      sell: false
    });
  }

  onHideGift() {
    this.setState({
      gift: false
    });
  }

  renderStats() {
    const {item, maxStats} = this.props;
    return (
      <dl style={{minHeight: maxStats * 20}}>
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
        {item.categories
          .filter(isValidItemCategory)
          .map(category =>
            <Badge onClick={onClick(item.game, [category])} key={category}>
              {category}
            </Badge>
          )}
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
