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
    _id: PropTypes.string
  };

  onSell(e) {
    e.preventDefault();
  }

  onGift(e) {
    e.preventDefault();
  }

  render() {
    const {name, categories, image} = this.props;
    return (
      <Col md={3} className="item">
        <Thumbnail src={image}>
          <h4>{name}</h4>
          <ButtonGroup justified>
            <Button href="#" onClick={::this.onSell}>
              <FormattedMessage id="buttons.sell" />
            </Button>
            <Button href="#" onClick={::this.onGift}>
              <FormattedMessage id="buttons.gift" />
            </Button>
          </ButtonGroup>
          <br />
          {categories.map(category => <Badge key={category}>{category}</Badge>)}
        </Thumbnail>
      </Col>
    );
  }

}
