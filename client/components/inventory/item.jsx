import "./item.less";
import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Col, Thumbnail} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import Gift from "../popups/gift";
import Sell from "../popups/sell";


export default class Item extends Component {
  static propTypes = {
    game: PropTypes.string,
    onClick: PropTypes.func,
    item: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      categories: PropTypes.array
    })
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

  render() {
    const {item, game, onClick} = this.props;
    return (
      <Col sm={6} md={4} lg={3} className="item">
        <Gift show={this.state.gift} item={item} onHide={::this.onHideGift} />
        <Sell show={this.state.sell} item={item} onHide={::this.onHideSell} />
        <Thumbnail src={item.image}>
          <h4>{name}</h4>
          <ButtonGroup justified>
            <Button href="#" onClick={::this.onShowSell} className="sell">
              <FormattedMessage id="buttons.sell" />
            </Button>
            <Button href="#" onClick={::this.onShowGift} className="gift">
              <FormattedMessage id="buttons.gift" />
            </Button>
          </ButtonGroup>
          <br />
          <div>
            {item.categories.map(category => <a href="#" onClick={onClick(game, [category])} key={category}><Badge>{category}</Badge></a>)}
          </div>
        </Thumbnail>
      </Col>
    );
  }
}
