import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage, FormattedMessage, injectIntl } from 'react-intl';
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

// import itemList from "./items.test.json";

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

  renderFilters(items, games) {
    let gameFilters = [];

    for (let i = 0; i < games.length; i++) {
      gameFilters.push({
        game: games[i].name,
        id: games[i].id,
        collapsed: true,
        categories: [],
        imgSource: `/static/images/games/${games[i].slug}/filter.png` || null,
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
      <div className={this.state.mobile ? 'mobileFilters' : 'filters'}>
        <style jsx>{`
          .filters {
            flex-basis: 25%;
          }
          .mobileFilters {
            width: 100%;
          }
          .gameFilterHeader {
            width: 100%;
            display: inline-block;
            text-align: center;
            border-bottom: 1px solid #E1E1E1;
            border-right: 1px solid #E1E1E1;
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
            font-size: 22px;
            font-weight: 500;
            position: relative;
            top: 25%;
          }
          .tree-view_item {
            /* immediate child of .tree-view, for styling convenience */
            cursor: pointer;
            border-bottom: 1px solid #E1E1E1;
            border-right: 1px solid #E1E1E1;
            padding-left: 20px;
            height: 80px;
          }
          .info {
            cursor: pointer;
            font-size: 18px;
            font-weight: 300;
            padding-left: 100px;
            height: 80px;
            position: relative;
            top: 25px;
          }
          /* style for the children nodes container */
          .tree-view_children {
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
          .tree-view_children .tree-view_game {
            display: none;
          }
          .tree-view_children .tree-view_item .node{
            padding-left: 55px;
            font-weight: 400;
            font-size: 20px;
            top: 30%;
          }
          /* rotate the triangle to close it */
          .tree-view_arrow-collapsed {
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            transform: rotate(-90deg);
            position: relative;
            top: 20%;
          }
          .tree-view_game {
            height: 45px;
            width: 45px;
            display: inline-block;
            position: relative;
            top: 20%;
            margin-right: 10px;
          }
        `}
        </style>
        <div className="gameFilterHeader">GAMES</div>
        {gameFilters.map((node, i) => {
          const name = node.game;
          const label = <span className="node">{name}</span>;
          return (
            <TreeView key={name + '|' + i} nodeLabel={label} defaultCollapsed={true} onClick={() => ::this.handleGameFilter(node.id)} imgSource={node.imgSource}>
              {node.categories.map(category => {
                const label2 = <span className="node">{category.categoryName}</span>;
                return (
                  <TreeView nodeLabel={label2} key={category.categoryName} defaultCollapsed={true} >
                  {
                    category.subCategories.map(subCategory => {
                      return (
                        <div key={subCategory} className="info" onClick={() => ::this.handleSubCategories(subCategory, node.id)}>{subCategory}</div>
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

    const filteredGame = visibleGames.find(game => parseInt(game.id, 10) === parseInt(this.state.gameFilter, 10));
    return (
      <div className={this.state.mobile ? 'filteredMobileMarket' : 'filteredMarket'}>
        <style jsx>{`
        .filteredMarket {
          width: 100%;
          margin-left: 25px;
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
    if (this.state.mobile !== this.props.layout.type.mobile) {
      this.setState({ mobile: this.props.layout.type.mobile });
    }
    const { games, user } = this.props;

    if (!games || !user) return <DataLoading />;
    if (games.loading || user.loading) return <DataLoading />;
    if (games.error) return <div>Error!</div>;

    let { listGames } = games;
    let { viewUserByWallet } = user;

    const loadingAny = games.loading || user.loading;

    return (
      <Query query={queries.listMarketplaceItems} variables={{
        userId: (viewUserByWallet) ? viewUserByWallet.id : null,
        language: (viewUserByWallet) ? viewUserByWallet.language : null,
        gameId: this.state.gameFilter,
        sort: null,
        categories: this.state.categories,
      }}>
        {({ loading, error, data }) => {
          if (loading) return <DataLoading />;
          if (error) return <DataError />;

          const { listMarketplaceItems } = data;

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
              {loadingAny ? <DataLoading /> : this.renderFilters(listMarketplaceItems, listGames)}
              {loadingAny ? <DataLoading /> : this.renderMarket(listMarketplaceItems, listGames)}
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
)(Market);
