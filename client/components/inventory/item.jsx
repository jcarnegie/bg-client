import "./item.less";
import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Col, Thumbnail} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {map} from "ramda";
import Gift from "../popups/gift";
import Sell from "../popups/sell";
import {isValidItemCategory, itemStats} from "../../utils/item";


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

  renderStats(item) {
    return map(stat => (
      <div key={stat.keyLan}>{stat.keyLan} <span className="stat">{stat.value}</span></div>
    ), itemStats(item));
  }

  render() {
    const {item, game, onClick, maxStats} = this.props;
    return (
      <Col sm={6} md={4} lg={3} className="item">
        <Gift show={this.state.gift} item={item} game={game} onHide={::this.onHideGift} />
        <Sell show={this.state.sell} item={item} game={game} onHide={::this.onHideSell} />
        <Thumbnail src={item.image}>
          <h4>{item.name}</h4>
          <div className="stats" style={{minHeight: maxStats * 20}}>
            {this.renderStats(item)}
          </div>
          <ButtonGroup justified>
            <Button href="#" onClick={::this.onShowSell} className="sell">
              <FormattedMessage id="buttons.sell" />
            </Button>
            <Button href="#" onClick={::this.onShowGift} className="gift">
              <FormattedMessage id="buttons.gift" />
            </Button>
          </ButtonGroup>
          <div className="categories">
            {
              item.categories
                .filter(isValidItemCategory)
                .map(category => <a href="#" onClick={onClick(game, [category])} key={category}><Badge>{category}</Badge></a>)}
          </div>
        </Thumbnail>
      </Col>
    );
  }
}
