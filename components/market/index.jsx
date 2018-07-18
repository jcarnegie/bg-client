import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage, FormattedMessage, injectIntl } from 'react-intl';
import { Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import {
  contains,
  filter,
  flatten,
  map,
  path,
  uniq,
} from 'ramda';

import TreeView from '@/components/treeview/treeview';
import DataLoading from '@/components/DataLoading';

import {
  listGamesQuery,
  viewUserByWalletQuery,
  listMarketplaceItemsQuery,
} from '@/shared/utils/apollo';

import {
  calcMaxItemsStats,
  // isValidItemCategory,
  isStat,
} from '@/client/utils/item';
import { MarketplaceItem as Item } from '@/components/item';

// import itemList from "./items.test.json";

@injectIntl
@connect(
  state => ({
    game: state.game,
  })
)

class Market extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    items: PropTypes.object,
    games: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    lastLocation: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    marketItems: PropTypes.object,
  }

  state = {
    filters: {},
  }

  handleFilter(filterName) {
    // graphql call goes here
  }

  renderFilters(items, games) {
    let gameFilters = [];

    for (let i = 0; i < games.length; i++) {
      gameFilters.push({
        game: games[i].name,
        id: games[i].id,
        collapsed: true,
        categories: [],
      });
    }

    const attrs = flatten(items.map(item => {
      let values = Object.values(item.attrs || {});
      return values.map(value => Object.assign({ game: item.game.id }, value));
    }));

    const categories = {};
    attrs.forEach(attr => {
      if (categories.hasOwnProperty(attr.game)) {
        if (!categories[attr.game].hasOwnProperty(attr.keyLan) && !isStat(attr)) {
          categories[attr.game][attr.keyLan] = [attr.value];
        } else if (!isStat(attr)) {
          categories[attr.game][attr.keyLan].push(attr.value);
        }
      } else if (!isStat(attr)) {
        categories[attr.game] = {};
        categories[attr.game][attr.keyLan] = [attr.value];
      }
    });

    for (var key in categories) {
      for (var categoryKey in categories[key]) {
        categories[key][categoryKey] = new Set(categories[key][categoryKey]);
      }
    }
    gameFilters.forEach(game => {
      for (var gameID in categories) {
        if (game.id === gameID) {
          for (var categoryKey in categories[gameID]) {
            game.categories.push({
              categoryName: categoryKey,
              subCategories: Array.from(categories[gameID][categoryKey]),
              }
            );
          }
        }
      }
    });

    return (
      <div className="filters">
        <style jsx>{`
          .filters {
            flex: 0 0 250px;
          }
          .gameFilterHeader{
            width: 100%;
            display: inline-block;
            text-align: center;
            border-bottom: 1px solid #E1E1E1;
            border-right: 1px solid #E1E1E1;
            height: 40px;
            font-weight: 400;
          }
        `}
        </style>
        <style global jsx>{`
          .tree-view {
            overflow-y: hidden;
          }
          .tree-view_item .node {
            font-size: 16px;
            font-weight: 500;
          }
          .tree-view_item {
            /* immediate child of .tree-view, for styling convenience */
            cursor: pointer;
            border-bottom: 1px solid #E1E1E1;
            border-right: 1px solid #E1E1E1;
            position: relative;
            left: 20px;
          }
          .info {
            cursor: pointer;
          }
          /* style for the children nodes container */
          .tree-view_children {
            margin-left: 14px;
            font-weight: 300;
            font-size: 13px;
            border-bottom: 1px solid #E1E1E1;
            border-right: 1px solid #E1E1E1;
          }
          .tree-view_children-collapsed {
            height: 0px;
          }
          .tree-view_arrow {
            cursor: pointer;
            margin-right: 6px;
            display: inline-block;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            height: 25px;
            width: 25px;
            background-color: #bbb;
            border-radius: 50%;
            border: 1px solid black;
            position: relative;
            top: 5px;
          }
          .tree-view_arrow:after {
            width: 25px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            border: 1px solid black;
          }
          /* rotate the triangle to close it */
          .tree-view_arrow-collapsed {
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            transform: rotate(-90deg);
          }
        `}
        </style>
        <div className="gameFilterHeader">GAMES</div>
        {gameFilters.map((node, i) => {
          const name = node.game;
          const label = <span className="node">{name}</span>;
          return (
            <TreeView key={name + '|' + i} nodeLabel={label} defaultCollapsed={true} onClick={() => ::this.handleFilter(name)}>
              {node.categories.map(category => {
                const label2 = <span className="node">{category.categoryName}</span>;
                return (
                  <TreeView nodeLabel={label2} key={category.categoryName} defaultCollapsed={true} onClick={() => ::this.handleFilter(category.categoryName)}>
                  {
                    category.subCategories.map(subCategory => {
                      return (
                        <div key={subCategory} className="info" onClick={() => ::this.handleFilter(subCategory)}>{subCategory}</div>
                      );
                    })
                  }
                  </TreeView>
                );
              })}
            </TreeView>
          );
        }
        )}
      </div>
    );
  }

  renderMarket(items, games) {
    return (items && items.length) ? this.renderItems(items, games) : this.renderEmpty();
  }

  renderItems(items, games) {
    const gameIdsWithItems = uniq(map(path(['game', 'id']), items));
    const visibleGames = filter(g => contains(g.id, gameIdsWithItems), games);

    return (
      <div className="filteredMarket">
        <style jsx>{`
        .filteredMarket {
          width: 100%;
        }
        .currentGameFilter {
          height: 60px;
          font-size: 28px;
          font-weight: 500;
        }
      `}</style>
        <div className='currentGameFilter'>
          HI IM A GAME
        </div>
        {visibleGames.map(game =>
          this.renderItem(game, items.filter(item => item.game.id === game.id))
        )}
      </div>
    );
  }

  renderItem(game, items) {
		const maxStats = calcMaxItemsStats(items);
    return (
      <Fragment key={game.id}>
        <div>
        </div>
        <Row className="flex-row">
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
    const { games, marketItems } = this.props;
    if (!games || !marketItems) return <DataLoading />;
    if (games.error || marketItems.error) return <div>games Error!</div>;

    let listItems = marketItems.listMarketplaceItems;
    let listGames = games.listGames;


    const loadingAny = games.loading || marketItems.loading;

    return (
      <div className="marketplace">
        <style jsx>{`
        .marketplace {
          display: flex;
        }
      `}</style>
        {this.flexStyle()}
        {loadingAny ? <DataLoading /> : this.renderFilters(listItems, listGames)}
        {loadingAny ? <DataLoading /> : this.renderMarket(listItems, listGames)}
      </div>
    );
  };

  flexStyle() {
    return (
      <style jsx global>{`
        .flex-row {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }
        .flex-row > [class*='col-'] {
          display: flex
          flex-direction: column;
        }
        .flex-row:after,
        .flex-row:before {
          display: flex;
        }
      `}</style>
    );
  }
};

export default compose(
  viewUserByWalletQuery,
  listGamesQuery,
  listMarketplaceItemsQuery,
)(Market);
