import "./index.less";
import "./flex.less";
import React, {Component, Fragment} from "react";
import {Button, Row, Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import Item from "./item";
import {uniq, uniqBy} from "lodash";
import {FormattedMessage} from "react-intl";


@connect(
  state => ({
    inventory: state.inventory
  })
)
export default class Inventory extends Component {
  static propTypes = {
    inventory: PropTypes.object
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

    const games = uniqBy(inventory.data.map(item => item.game), "_id");

    return (
      <div>
        <h2>
          <FormattedMessage id="components.menu.inventory" />
        </h2>

        <Tabs defaultActiveKey={1} id="inventory" onSelect={::this.onSelect}>
          <Tab eventKey={1} title="All items">
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
                  <Row className="flex-row">
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
                <Row className="flex-row">
                  {items.filter(item => Object.keys(this.state.filters).includes(item.game._id) ? this.state.filters[item.game._id].filter(x => !!~item.categories.indexOf(x)).length : true)
                    .map(item => <Item key={item._id} {...item} onClick={::this.onClick} />)}
                </Row>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    );
  }
}
