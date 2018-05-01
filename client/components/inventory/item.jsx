import "./item.less";
import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Col, Thumbnail} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";


export default class Inventory extends Component {
  static propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    categories: PropTypes.array,
    _id: PropTypes.string,
    game: PropTypes.object,
    onClick: PropTypes.func
  };

  onSell(e) {
    e.preventDefault();
    alert("Not implemented!");
  }

  onGift(e) {
    e.preventDefault();
    alert("Not implemented!");
  }

  render() {
    const {name, categories, image, game, onClick} = this.props;
    return (
      <Col xs={6} sm={4} md={3} className="item">
        <Thumbnail src={image}>
          <h4>{name}</h4>
          <ButtonGroup justified>
            <Button href="#" onClick={::this.onSell} className="sell">
              <FormattedMessage id="buttons.sell" />
            </Button>
            <Button href="#" onClick={::this.onGift} className="gift">
              <FormattedMessage id="buttons.gift" />
            </Button>
          </ButtonGroup>
          <br />
          {categories.map(category => <a href="#" onClick={onClick(game, [category])} key={category}><Badge>{category}</Badge></a>)}
        </Thumbnail>
      </Col>
    );
  }
}
