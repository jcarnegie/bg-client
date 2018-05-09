import "./index.less";
import "./tabs.less";
import React, {Component, Fragment} from "react";
import {Button, Col, Image, Row, Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import Item from "./item";
import {uniq, uniqBy} from "lodash";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Chat from "../chat/chat";


@connect(
  state => ({
    inventory: state.inventory
  })
)
export default class Inventory extends Component {
  static propTypes = {
    inventory: PropTypes.object,
    lastMatch: PropTypes.object.isRequired
  };

  state = {
    filters: {}
  };

  onClick(game, categories) {
    return e => {
      e.preventDefault();
      this.setState({
        filters: {
          ...this.state.filters,
          [game._id]: categories
        }
      });
    };
  }

  onSelect(key) {
    if (key === 1) {
      this.setState({filters: {}});
    }
  }

  render() {
    const {inventory} = this.props;

    if (inventory.isLoading) {
      return (
        <Loader />
      );
    }

    if (!inventory.success) {
      return null;
    }

    return (
      <Row className="inventory">
        <Col className="grap gap">
          {inventory.data.length ? this.renderTabs() : this.renderEmpty()}
        </Col>
        <Col className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }

  renderBackToGameButton() {
    const {lastMatch} = this.props;

    if (!lastMatch.params._id) {
      return null;
    }

    return (
      <div className="pull-right">
        <Button>
          <FormattedMessage id="pages.inventory.back-to-game" />
        </Button>
      </div>
    );
  }

  renderTabs() {
    const {inventory} = this.props;
    const games = uniqBy(inventory.data.map(item => item.game), "_id");

    return (
      <>
        <h2>
          <FormattedMessage id="pages.inventory.title" />
          {this.renderBackToGameButton()}
        </h2>
        <Tabs defaultActiveKey={1} id="inventory" onSelect={::this.onSelect}>
          <Tab eventKey={1} title={<FormattedMessage id="pages.inventory.all-items" />}>
            {games.map(game => {
              const items = inventory.data.filter(item => item.game._id === game._id);
              const categories = uniq([].concat(...items.map(item => item.categories)));
              return (
                <Fragment key={game._id}>
                  <div className="arrow-right pull-right">
                    <Button onClick={::this.onClick(game, categories)} bsStyle="link">All</Button>
                    {categories.map((category, i) => <Button key={i} onClick={::this.onClick(game, [category])} bsStyle="link">{category}</Button>)}
                  </div>
                  <h3>{game.name}</h3>
                  <Row>
                    {items.filter(item => Object.keys(this.state.filters).includes(item.game._id) ? this.state.filters[item.game._id].filter(x => !!~item.categories.indexOf(x)).length : true)
                      .map(item => <Item key={item._id} {...item} onClick={::this.onClick} />)}
                  </Row>
                </Fragment>
              );
            })}
          </Tab>
          {games.map((game, i) => {
            const items = inventory.data.filter(item => item.game._id === game._id);
            const categories = uniq([].concat(...items.map(item => item.categories)));
            return (
              <Tab eventKey={i + 2} title={game.name} key={game._id}>
                <div className="arrow-right pull-right">
                  <Button onClick={::this.onClick(game, categories)} bsStyle="link">All</Button>
                  {categories.map((category, i) => <Button key={i} onClick={::this.onClick(game, [category])} bsStyle="link">{category}</Button>)}
                </div>
                <h3>{game.name}</h3>
                <Row>
                  {items.filter(item => Object.keys(this.state.filters).includes(item.game._id) ? this.state.filters[item.game._id].filter(x => !!~item.categories.indexOf(x)).length : true)
                    .map(item => <Item key={item._id} {...item} onClick={::this.onClick} />)}
                </Row>
              </Tab>
            );
          })}
        </Tabs>
      </>
    );
  }

  renderEmpty() {
    return (
      <div className="empty">
        <div>
          <h2>
            <FormattedMessage id="pages.inventory.empty" />
          </h2>
          <Image src="/images/empty-box.png" />
          <p>
            <FormattedMessage id="pages.inventory.learn-more" />
            {" "}
            <Link to="/faq">
              <FormattedMessage id="pages.inventory.faq" />
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
