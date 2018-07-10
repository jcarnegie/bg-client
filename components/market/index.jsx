import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";
import {Image, Row} from "react-bootstrap";
import { connect } from "react-redux";
import Link from "next/link";
import {contains, filter, flatten, map, path, uniq, values} from "ramda";
import Router from "next/router";


import {compose} from "react-apollo";

import {
  listGamesQuery,
  listItemsQuery,
  viewUserByWalletQuery
} from "@/shared/utils/apollo";

import {calcMaxItemsStats} from "@/client/utils/item";
import Item from "./item";

import itemList from './items.test.json';


@injectIntl
@connect(
  state => ({
    game: state.game,
  })
)

class Market extends Component{
  static propTypes = {
    dispatch: PropTypes.func,
    items: PropTypes.object,
    games: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    lastLocation: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  };

  state = {
    filters: {},
  }

  renderFilters() {
    const {games} = this.props;

    return (
      <div className="filters">
        <style jsx>{`
          .filters {
            flex: 0 0 200px;
          }
        `}
        </style>
        <div>
          GAME FILTERS
        </div>
        {games.listGames.map(game =>
          this.renderGameFilters(game)
        )}
      </div>
    )
  }

  renderGameFilters(game) {
    return(
      <div>
        {game.name}
      </div>
    )
  }

  renderMarket() {
    // const {items, games} = this.props;
    const {games} = this.props;
    const items = itemList;

    return items.length ? this.renderItems(items, games.listGames): this.renderEmpty();
  }

  renderItems() {
    const {games} = this.props;
    //saving for pattern
    // const items = this.props.items.listItems || [];
    const items = itemList;
    const gameIdsWithItems = uniq(map(path(["game", "id"]), items));
    const visibleGames = filter(g => contains(g.id, gameIdsWithItems), games.listGames);

    return (
      <div>
        <div>PUT SEARCH HERE</div>
        <FormattedMessage id={items.length.toString()} />
        {visibleGames.map(game =>
          this.renderItem(game, items.filter(item => item.game.id === game.id))
        )}
      </div>
    );
  }

  renderItem(game, items) {
    // console.log(items)
    items = items || [];
		const attrs = flatten(items.map(item => values(item.attrs || {})));
		const maxStats = calcMaxItemsStats(items);

    return (
      <Fragment key={game.id}>
        <div>
        </div>
        <Row>
          {items.filter(item => Object.keys(this.state.filters).includes(item.game.id) ? this.state.filters[item.game.id].filter(x => !!~item.categories.indexOf(x)).length : true)
            .map(item =>
              <Item key={item.tokenId} item={item} game={game} maxStats={maxStats} />
          )}
        </Row>
      </Fragment>
    );
  }

  renderEmpty() {
    return (
      <div>
        <div>
          <h2>
            <FormattedMessage id="pages.inventory.empty" />
          </h2>
          <Image src="/static/images/misc/empty-box.png" />
          <p>
            <FormattedHTMLMessage id="pages.inventory.faq" />
          </p>
        </div>
      </div>
    );
  }


  render() {
    const {games} = this.props;
    const items = itemList;

    if (games.loading || items.loading) return <div>loading!</div>;
    if (games.error || items.error) return <div>games.listGames Error!</div>;
    return (
      <div className="marketplace">
        <style jsx>{`
        .marketplace {
          display: flex;
        }
      `}</style>
        {this.renderFilters()}
        {this.renderMarket()}
      </div>
    );
  };
};


export default compose(
  viewUserByWalletQuery,
  listGamesQuery,
  listItemsQuery,
)(Market);