import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose, Query } from 'react-apollo';
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
import DataError from '@/components/DataError';

import {
  queries,
  listGamesQuery,
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import {
  calcMaxItemsStats,
  // isValidItemCategory,
  isStat,
} from '@/client/utils/item';
import { MarketplaceItem as Item } from '@/components/item';

import itemList from "./items.test.json";

@injectIntl
@connect(
  state => ({
    layout: state.layout,
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
    mobile: this.props.layout.type.mobile,
    gameFilter: '1',
    categories: null,
  }

  handleGameFilter(gameFilter) {
    if (this.state.gameFilter !== gameFilter) {
      this.setState({ gameFilter });
    }
  }

  handleSubCategories(subCategory) {
    if (this.state.categories && this.state.categories.includes(subCategory)) {
      let index = this.state.categories.indexOf(subCategory);
      this.state.categories.splice(index, 1);
      this.setState({
        categories: null
      });
    } else {
      if (this.state.categories) {
        this.setState({
          categories: null
        });
      } else {
        const categories = this.state.categories || [];
        categories.push(subCategory);
        this.setState({ categories });
      }
    }
  }

  renderFilters(items, games, loading = false) {
    let gameFilters = [];
    if (!loading || (games && items)) {
      gameFilters = games.map(({ name, id, slug }) => ({
        name,
        id,
        collapsed: true,
        categories: [],
        imgSource: `/static/images/games/${slug}/filter.png` || null,
      }));

      const categories = {};
      const attrs = flatten(items.map(item => {
        let values = Object.values(item.attrs || {});
        return values.map(value => Object.assign({ game: item.game.id }, value));
      }));

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
    }
    return (
      <div className={cx({
        mobileFilters: this.state.mobile,
        filters: !this.state.mobile,
      }, 'no-select')}>
        <style jsx>{`
          .filters {
            min-width: 282px;
            border-right: solid 2px #E1E1E1;
            margin-right: -1px;
            min-height: calc(100vh - 62px);
          }
          .mobileFilters {
            width: 100%;
          }
          .gameFilterHeader {
            width: 100%;
            display: inline-block;
            text-align: center;
            border-bottom: 1px solid #E1E1E1;
            height: 50px;
            font-weight: 400;
            line-height: 45px;
            font-size: 1.2em;
          }
        `}
        </style>
        <style global jsx>{`
          .tree-view {}
          .tree-view_item .node {
            font-size: 20px;
            font-weight: 500;
            position: relative;
            top: 25%;
          }
          .tree-view_item {
            /* immediate child of .tree-view, for styling convenience */
            cursor: pointer;
            padding-left: 20px;
            height: 80px;
            border-bottom: 1px solid #E1E1E1;
          }
          .treeview-active-item {
            background-color: #D3E0F7;
          }
          .info {
            cursor: pointer;
            font-size: 16px;
            font-weight: 300;
            height: 45px;
            padding: 0 20px 0 100px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #EFEFEF;
          }

          /* style for the children nodes container */
          .tree-view_children {
            // border-bottom: 1px solid #E1E1E1;
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
            position: relative;
            top: 20%;
          }
          .tree-view_arrow:after {
            width: 25px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            border: 1px solid black;
            position: relative;
            top: 20%;
          }
          .tree-view_children .tree-view_image {
            display: none;
          }
          .tree-view_children .tree-view_item .node {
            padding-left: 55px;
            font-weight: 400;
            font-size: 20px;
            top: 30%;
          }
          .tree-view_children .tree-view_item .node.category {
            font-size: 18px;
          }
          .tree-view_children .tree-view_item {
            /* immediate child of .tree-view, for styling convenience */
            cursor: pointer;
            padding-left: 20px;
            height: 65px;
          }
          .tree-view_image {
            height: 45px;
            width: 45px;
            display: inline-block;
            position: relative;
            top: 20%;
            margin-right: 10px;
          }
        `}
        </style>
        <div className="gameFilterHeader">
          <FormattedMessage id="pages.marketplace.games" />
        </div>
        {(loading && !(games && items)) ? <DataLoading /> : gameFilters.map((node, i) => {
          const { name, id, categories, imgSource } = node;
          const { gameFilter } = this.state;
          const gameFilterIsSelected = gameFilter == id;
          return (
            <TreeView
              key={name + '|' + i}
              nodeLabel={<span className="node">{name}</span>}
              collapsed={!gameFilterIsSelected}
              onClick={() => ::this.handleGameFilter(id)}
              imgSource={imgSource}
              itemClassName={gameFilterIsSelected ? 'treeview-active-item' : ''}
            >
              {categories.map(({ categoryName, subCategories }) => {
                return (
                  <TreeView
                    defaultCollapsed
                    nodeLabel={<span className="node category">{categoryName}</span>}
                    key={categoryName}
                    chevronSize={20}
                  >
                  {
                    subCategories.map(subCategory => {
                      return (
                        <div key={subCategory} className="info" onClick={() => ::this.handleSubCategories(subCategory, id)}>{subCategory}</div>
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

  renderMarket(items, games, loading = false) {
    return (items && items.length) ? this.renderItems(items, games) : this.renderEmpty();
  }

  renderItems(items, games) {
    const gameIdsWithItems = uniq(map(path(['game', 'id']), items));
    const visibleGames = filter(g => contains(g.id, gameIdsWithItems), games);

    const filteredGame = visibleGames.find(game => parseInt(game.id, 10) === parseInt(this.state.gameFilter, 10));
    return (
      <div className={this.state.mobile ? 'filteredMobileMarket' : 'filteredMarket'}>
        <style jsx>{`
        .filteredMarket {
          width: 100%;
          padding: 0px 25px 25px 25px;
          background-color: #F5F7FB;
        }
        .filteredMobileMarket {
          width: 70%;
          margin: 0 auto;
          background-color: #F5F7FB;
        }
        .currentGameFilter {
          height: 80px;
          font-size: 28px;
          font-weight: 500;
          line-height: 70px;
          background-color: #F5F7FB;
          margin-left: 15px;
        }
        .currentGameMobileFilter {
          height: 80px;
          font-size: 28px;
          font-weight: 500;
          line-height: 70px;
          background-color: #F5F7FB;
          text-align: center;
        }
      `}</style>
        <div className={this.state.mobile ? 'currentGameMobileFilter' : 'currentGameFilter'}>
          {filteredGame ? filteredGame.name : 'Items'}
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
        <Row className="flex-row">
          {items.filter(item => Object.keys(this.state.gameFilter).includes(item.game.id) ? this.state.gameFilter[item.game.id].filter(x => !!~item.categories.indexOf(x)).length : true)
            .map(item =>
              <Item key={item.tokenId} item={item} game={game} maxStats={maxStats} />
          )}
        </Row>
      </Fragment>
    );
  }

  renderEmpty() {
    return (
      <div className="empty">
        <style jsx global>{`
         .marketplace .empty {
          display: flex;
          text-align: center;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          margin-top: calc(100vh - 80vh)
        }
        .marketplace .empty h2 {
          font-size: 1.5em;
        }
        .marketplace .empty img {
          height: 250px;
          width: 250px;
          margin: 40px;
          opacity: 0.9;
        }
        .marketplace .empty p {
          font-size: 28px;
        }
        .mobileMarket .empty {
          display: flex;
          text-align: center;
          align-items: center;
          vertical-align: middle;
          justify-content: center;
          height: 100%
        }
        .mobileMarket .empty h2 {
          font-size: 1em;
        }
        .mobileMarket .empty img {
          height: 220px;
          width: 220px;
          margin: 40px;
        }
        .mobileMarket .empty p {
          font-size: 28px;
        }
        `}</style>
        <div>
          <h2>
            <FormattedMessage id="pages.marketplace.empty" />
          </h2>
          <Image src="/static/images/misc/empty-box.png" />
        </div>
      </div>
    );
  }


  render() {
    if (this.state.mobile !== this.props.layout.type.mobile) {
      this.setState({ mobile: this.props.layout.type.mobile });
    }
    const { games, user } = this.props;

    if (!games || !user) return <DataLoading />;
    if (games.loading || user.loading) return <DataLoading />;
    if (games.error) return <div>Error!</div>;

    let { listGames } = games;
    let { viewUserByWallet } = user;

    return (
      <Query query={queries.listMarketplaceItems} variables={{
        userId: (viewUserByWallet) ? viewUserByWallet.id : null,
        language: (viewUserByWallet) ? viewUserByWallet.language : null,
        gameId: this.state.gameFilter,
        sort: null,
        categories: this.state.categories,
      }}>
        {({ loading, error, data }) => {
          if (error) return <DataError />;

          // const { listMarketplaceItems } = data;
          const listMarketplaceItems = itemList;

          const loadingAny = loading || games.loading || user.loading;

          return (
            <div className={this.state.mobile ? 'mobileMarket' : 'marketplace'}>
              <style jsx>{`
              .marketplace {
                display: flex;
              }
              .mobileMarket{
                display: flex;
                flex-direction: column;
              }
            `}</style>
              {this.flexStyle()}
              {this.renderFilters(listMarketplaceItems, listGames, loadingAny)}
              {(!loadingAny || (listMarketplaceItems && listGames)) ? this.renderMarket(listMarketplaceItems, listGames) : null}
            </div>
          );
        }}
      </Query>
    );
  };

  flexStyle() {
    return (
      <style jsx global>{`
        .flex-row {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          margin: 0;
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
};

export default compose(
  viewUserByWalletQuery,
  listGamesQuery,
)(Market);
