/*
 * TODO - Modularize sub-componnts for re-use
**/
import React, {Component, Fragment} from "react";
import {Button, Image, Row, Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Router from "next/router";
import {contains, isEmpty, filter, map, prop, uniq} from "ramda";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";

import Loader from "../common/loader";
import {calcMaxItemsStats, isValidItemCategory} from "../../client/utils/item";
import {INVENTORY_GAMES_REQUEST, INVENTORY_ITEMS_REQUEST} from "../../shared/constants/actions";

import Item from "./item";


@connect(
  state => ({
    items: state.items,
    games: state.games,
    user: state.user,
  })
)
export default class Inventory extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    items: PropTypes.object,
    games: PropTypes.object,
    user: PropTypes.object,
    lastLocation: PropTypes.shape({
		pathname: PropTypes.string,
    }),
  };

  state = {
    filters: {},
  };

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: INVENTORY_GAMES_REQUEST,
      payload: this.props.user,
    });
    dispatch({
      type: INVENTORY_ITEMS_REQUEST,
      payload: this.props.user,
    });
  }

  onClick(game, categories) {
    return e => {
      e.preventDefault();
      this.setState({
        filters: {
          ...this.state.filters,
          [game]: categories,
        },
      });
    };
  }

  onSelect(key) {
    if (key === 1) {
      this.setState({filters: {}});
    }
  }

  renderInventory() {
    const {items, games} = this.props;

    if (items.isLoading || games.isLoading) {
      return <Loader />;
    }

    if (!items.success || !games.success) {
      return null;
    }

    return items.data.length ? this.renderTabs() : this.renderEmpty();
  }

  renderBackToGameButton() {
	const {lastLocation} = this.props;
    console.log("lastLocation: ", lastLocation);
    if (!lastLocation || !lastLocation.pathname.startsWith("/game/")) {
      return null;
    }

    return (
      <div className="pull-right">
        <Button onClick={Router.back}>
          <FormattedMessage id="pages.inventory.back-to-game" />
        </Button>
      </div>
    );
  }

  renderCategories(game, categories) {
    if (!categories.length) {
      return null;
    }
    return (
      <>
        <Button onClick={::this.onClick(game._id, categories)} bsStyle="link">
          <FormattedMessage id="pages.inventory.all" />
        </Button>
        {categories
          .filter(isValidItemCategory)
          .map((category, i) =>
            <Button key={i} onClick={::this.onClick(game._id, [category])} bsStyle="link">
              {category}
            </Button>
          )}
      </>
    );
  }

  renderTab(game, items) {
    const categories = uniq([].concat(...items.map(item => item.categories)));
    const maxStats = calcMaxItemsStats(items);

    return (
      <Fragment key={game._id}>
        <div className="arrow-right pull-right">
          {this.renderCategories(game, categories)}
        </div>
        <h3>{game.name}</h3>
        <Row className="flex-row">
        {items.filter(item => Object.keys(this.state.filters).includes(item.game) ? this.state.filters[item.game].filter(x => !!~item.categories.indexOf(x)).length : true)
            .map(item =>
              <Item key={item.tokenId} item={item} game={game} maxStats={maxStats} onClick={::this.onClick} />
            )}
        </Row>
      </Fragment>
    );
  }

  renderTabs() {
    const {items, games} = this.props;
    const gameIdsWithItems = uniq(map(prop("game"), items.data));
    let visibleGames = filter(g => contains(g._id, gameIdsWithItems), games.data);

    if (isEmpty(visibleGames)) visibleGames = [];

    return (
      <>
        <h2>
          <FormattedMessage id="pages.inventory.title" />
          {this.renderBackToGameButton()}
        </h2>
        <Tabs defaultActiveKey={1} id="inventory" onSelect={::this.onSelect}>
          <Tab eventKey={1} title={<FormattedMessage id="pages.inventory.all-items" />}>
            {visibleGames.map(game =>
              this.renderTab(game, items.data.filter(item => item.game === game._id))
            )}
          </Tab>
          {visibleGames.map((game, i) =>
            <Tab eventKey={i + 2} title={game.name} key={game._id}>
              {this.renderTab(game, items.data.filter(item => item.game === game._id))}
            </Tab>
          )}
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
          <Image src="/static/images/empty-box.png" />
          <p>
            <FormattedHTMLMessage id="pages.inventory.faq" />
          </p>
        </div>
      </div>
    );
  }

  indexStyle() {
    return (
      <style jsx global>{`
    		.inventory h2 {
  			  font-weight: 500;
  			}
  			.inventory h2 .btn {
  			  text-transform: uppercase;
  			  font-size: 14px;
  			  font-weight: 600;
  			  color: #FF8E64;
  			  border-color: #FF8E64;
  			}
  			.inventory h2 .btn:hover,
  			.inventory h2 .btn:focus {
  			  color: #FF8E64;
  			  border-color: #FF8E64;
  			  background-color: #FFD6C7;
  			}
  			.inventory h3 {
  			  font-size: 15px;
  			  font-weight: bold;
  			  line-height: 34px;
  			  margin-top: 0;
  			  margin-bottom: 10px;
  			}
  			.inventory .arrow-right {
  			  font-size: 13px;
  			}
  			.inventory .arrow-right button {
  			  padding: 6px;
  			  color: var(--main-color);
  			  font-weight: 400;
  			}
  			.inventory .arrow-right button:hover {
  			  color: var(--main-color);
  			}
  			.inventory .arrow-right button:first-child {
  			  font-weight: 600;
  			}
  			.inventory .empty {
  			  display: flex;
  			  text-align: center;
  			  align-items: center;
  			  vertical-align: middle;
  			  justify-content: center;
  			  height: calc(100vh - 62px);
  			}
  			.inventory .empty h2 {
  			  font-size: 38px;
  			}
  			.inventory .empty img {
  			  height: 220px;
  			  width: 220px;
  			  margin: 40px;
  			}
  			.inventory .empty p {
  			  font-size: 28px;
  			}
    	`}</style>
    );
  }

  flexStyle() {
    return (
      <style jsx global>{`
  			.flex-row {
  			  display: flex;
  			  flex-wrap: wrap;
  			}
  			.flex-row > [class*='col-'] {
  			  display: flex;
  			  flex-direction: column;
  			}
  			.flex-row:after,
  			.flex-row:before {
  			  display: flex;
  			}
    	`}</style>
    );
  }
  tabsStyle() {
    return (
      <style jsx global>{`
  			.nav-tabs li a {
  			  color: var(--main-color);
  			  font-size: 14px;
  			  font-weight: 400;
  			  line-height: 16px;
  			}
  			.nav-tabs li a:hover,
  			.nav-tabs li a:focus {
  			  background: none;
  			  border: 1px solid transparent;
  			  outline: 0;
  			}
  			.nav-tabs li.active a {
  			  color: var(--main-color);
  			  font-size: 16px;
  			  font-weight: 600;
  			}
  			.nav-tabs li.active a,
  			.nav-tabs li.active a:hover,
  			.nav-tabs li.active a:focus {
  			  color: var(--main-color);
  			  border: 0;
  			  border-bottom: 2px solid var(--main-color);
  			}
  			.tab-content {
  			  padding-top: 20px;
  			}
    		`}</style>
    );
  }

  render() {
    return (
      <div className="gap inventory">
        {this.indexStyle()}
        {this.flexStyle()}
        {this.tabsStyle()}
        {this.renderInventory()}
      </div>
    );
  }
}
