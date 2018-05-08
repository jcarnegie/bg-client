import "./item.less";
import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Col, Thumbnail} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import Gift from "../popups/gift";


export default class Inventory extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    categories: PropTypes.array,
    _id: PropTypes.string,
    game: PropTypes.object,
    onClick: PropTypes.func
  };

  state = {
    show: false
  };

  onSell(e) {
    e.preventDefault();
    alert("Not implemented!");
  }

  onGift(e) {
    e.preventDefault();
    this.setState({
      show: true
    });
  }

  onHide() {
    this.setState({
      show: false
    });
  }

  render() {
    const {id, name, categories, image, game, onClick} = this.props;
    return (
      <Col sm={6} md={4} lg={3} className="item">
        <Gift show={this.state.show} name={name} id={id} image={image} onHide={::this.onHide} />
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
          <div>
            {categories.map(category => <a href="#" onClick={onClick(game, [category])} key={category}><Badge>{category}</Badge></a>)}
          </div>
        </Thumbnail>
      </Col>
    );
  }
}
