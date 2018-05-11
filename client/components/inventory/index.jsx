import "./index.less";
import "./tabs.less";
import React, {Component, Fragment} from "react";
import {Button, Col, Image, Row, Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import Item from "./item";
import {uniq} from "lodash";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import Chat from "../chat/chat";
// import {INVENTORY_GAMES_REQUEST, INVENTORY_ITEMS_REQUEST} from "../../../shared/constants/actions";


@connect(
  state => ({
    items: state.items,
    games: state.games,
    user: state.user
  })
)
export default class Inventory extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    items: PropTypes.object,
    games: PropTypes.object,
    user: PropTypes.object,
    lastMatch: PropTypes.object.isRequired
  };

  state = {
    filters: {}
  };

  /*
  componentDidMount() {
    this.props.dispatch({
      type: INVENTORY_GAMES_REQUEST,
      payload: this.props.user
    });
    this.props.dispatch({
      type: INVENTORY_ITEMS_REQUEST,
      payload: this.props.user
    });
  }
  */

  onClick(game, categories) {
    return e => {
      e.preventDefault();
      this.setState({
        filters: {
          ...this.state.filters,
          [game]: categories
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
    const {items, games} = this.props;

    if (items.isLoading || games.isLoading) {
      return (
        <Loader />
      );
    }

    if (!items.success || !games.success) {
      return null;
    }

    return (
      <Row className="inventory">
        <Col className="grap gap">
          {items.data.length ? this.renderTabs() : this.renderEmpty()}
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
        <Button href={lastMatch.url}>
          <FormattedMessage id="pages.inventory.back-to-game" />
        </Button>
      </div>
    );
  }

  renderTab(game, items) {
    const categories = uniq([].concat(...items.map(item => item.categories)));
    return (
      <Fragment key={game._id}>
        <div className="arrow-right pull-right">
          <Button onClick={::this.onClick(game._id, categories)} bsStyle="link">
            <FormattedMessage id="pages.inventory.all" />
          </Button>
          {categories.map((category, i) => <Button key={i} onClick={::this.onClick(game._id, [category])} bsStyle="link">{category}</Button>)}
        </div>
        <h3>{game.name}</h3>
        <Row>
          {items.filter(item => Object.keys(this.state.filters).includes(item.game) ? this.state.filters[item.game].filter(x => !!~item.categories.indexOf(x)).length : true)
            .map(item => <Item key={item.tokenId} item={item} game={game} onClick={::this.onClick} />)}
        </Row>
      </Fragment>
    );
  }

  renderTabs() {
    const {items, games} = this.props;

    return (
      <>
        <h2>
          <FormattedMessage id="pages.inventory.title" />
          {this.renderBackToGameButton()}
        </h2>
        <Tabs defaultActiveKey={1} id="inventory" onSelect={::this.onSelect}>
          <Tab eventKey={1} title={<FormattedMessage id="pages.inventory.all-items" />}>
            {games.data.map(game =>
              this.renderTab(game, items.data.filter(item => item.game === game._id))
            )}
          </Tab>
          {games.data.map((game, i) => {
            return (
              <Tab eventKey={i + 2} title={game.name} key={game._id}>
                {this.renderTab(game, items.data.filter(item => item.game === game._id))}
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
            <FormattedHTMLMessage id="pages.inventory.faq" />
          </p>
        </div>
      </div>
    );
  }
}
