import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Image, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose, Query } from 'react-apollo';
import {
  contains,
  filter,
  flatten,
  map,
  path,
  uniq,
  intersection,
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
  isStat,
} from '@/client/utils/item';
import { MarketplaceItem } from '@/components/item';

// import itemList from './items.test.json';


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
    layout: PropTypes.object,
    lastLocation: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    marketItems: PropTypes.object,
  }

  state = {
    mobile: this.props.layout.type.mobile,
    gameFilter: false,
    categories: [],
    secondaryCategories: [],
    itemsSort: [['saleExpiration', 'ASC']],
    itemsSortTitle: 'Newest',
  }

  static getDerivedStateFromProps(props, state) {
    if (state.mobile !== props.layout.type.mobile) {
      return {
        mobile: props.layout.type.mobile,
        gameFilter: state.gameFilter,
        categories: state.categories,
        secondaryCategories: state.secondaryCategories,
        itemsSort: state.itemsSort,
        itemsSortTitle: state.itemsSortTitle,
      };
    }
  }

  handleGameFilter(gameFilter) {
    if (this.state.gameFilter !== gameFilter) {
      this.setState({ gameFilter, categories: [], secondaryCategories: [] });
    }
  }

  handlePrimaryCategories(subCategory) {
    if (subCategory === false) {
      const categories = [];
      this.setState({ categories, secondaryCategories: [] });
    } else {
      this.setState({ categories: [subCategory], secondaryCategories: [] });
    }
  }

  handleSecondaryCategories(category) {
    const index = this.state.secondaryCategories.indexOf(category);
    let categories = Array.from(this.state.secondaryCategories);
    if (categories.includes(category)) {
      categories.splice(index, 1);
      this.setState({
        secondaryCategories: categories,
      });
    } else {
      categories.push(category);
      this.setState({
        secondaryCategories: categories,
      });
    }
  }

  handleBuy(refetch) {
    return (item, results) => {
      setTimeout(refetch, 2000);
    };
  }

  renderSecondaryFilters(gameFilter) {
    const filterColors = ['#4A90E2', '#805DFF', '#43ABAE'];
    let secondaryCategories = [];
    let categoryIndex = null;

    gameFilter.categories.map((category, i) => {
      if (!category.subCategories.includes(this.state.categories[0])) {
        secondaryCategories.push(category);
      } else {
        secondaryCategories.push(category);
        categoryIndex = i;
      }
    });
    return (
      <div className="secondary-filter">
        <style jsx>{`
          .secondary-filter {
            background-color: #EFF3FB;
            min-height: 46%;
          }
          .secondary-filter-header {
            border-bottom: 1px solid #EEEEEE;
            padding-top: 10px;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: .9em;
          }
          .secondary-category-header {
            border: none;
            font-size: .8em;
            padding-left: 60px;
            margin-bottom: 5px;
            margin-top: 15px;
            text-transform: uppercase;
          }
          .secondary-category {
            font-size: .8em;
            padding-left: 61px;
          }
          .secondary-category label {
             font-weight: 300;
          }
          .filter-icon {
            margin-left: 18px;
            margin-right: 16px;
            height: 25px;
            width: 25px;
            position: relative;
            bottom: 3px;
          }
          .filter-checkbox {
            margin-right: 10px;
            position: relative;
            bottom: 2px;
          }
        `}
        </style>
        <div className="secondary-filter-header">
          <img src="/static/images/icons/filter_icon.svg" className="filter-icon" />
          FILTERS
        </div>
        {secondaryCategories.map((category, i) => {
          let styles = {
            color: filterColors[(i) % filterColors.length],
          };
          if (categoryIndex !== i) {
            return (
              <>
                <legend className="secondary-category-header" style={styles}>{category.categoryName}</legend>
                { category.subCategories.map(subCategory => {
                  return (
                    <div
                      className="secondary-category"
                      key={subCategory}>
                      <input
                        type="checkbox" id={subCategory}
                        name="feature"
                        className="filter-checkbox"
                        onChange={() => ::this.handleSecondaryCategories(subCategory)}
                        checked={!this.state.secondaryCategories.includes(subCategory)}
                        />
                      <label>{subCategory}</label>
                    </div>
                  );
                })}
              </>
            );
          }
        })}
      </div>
    );
  }

  renderPrimaryFilters(items, games, loading = false) {
    let gameFilters = [];
    const filterColors = ['#4A90E2', '#805DFF', '#43ABAE'];

    if (!games || !items) return null;

    if (!loading || (games && items)) {
      const gamesWithItemsForSale = games.filter(game => (game.itemsForSaleCount > 0));
      if (gamesWithItemsForSale.length === 0) return null;
      gameFilters = gamesWithItemsForSale.map(({ name, id, slug }) => ({
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
        if (!attr.keyLan || (attr.value === null || attr.value === undefined || attr.value === '')) return;
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
            min-width: 250px;
            border-right: solid 2px #EEEEEE;
            margin-right: -1px;
            min-height: calc(100vh - 62px);
            background-color: white;
          }
          .mobileFilters {
            width: 100%;
          }
          .gameFilterHeader {
            width: 100%;
            display: inline-block;
            text-align: center;
            border-bottom: 1px solid #EEEEEE;
            height: 50px;
            font-weight: 400;
            line-height: 45px;
            font-size: 0.8em;
            text-transform: uppercase;
            cursor: pointer;
            color: #919497;
          }
          .primary-filter {
            min-height: 50%;
          }
        `}
        </style>
        <style global jsx>{`
          .tree-view {}
          .tree-view_item .node {
            font-size: 1.0em;
            font-weight: 500;
            position: relative;
          }
          .tree-view_item {
            /* immediate child of .tree-view, for styling convenience */
            cursor: pointer;
            padding-left: 15px;
            height: 50px;
            border-top: 1px solid #EEEEEE;
            display: flex;
            align-items: center;
          }
          .treeview-active-item {
            background-color: #D3E0F7;
            font-weight 50
          }
          .info {
            cursor: pointer;
            font-size: 0.8em;
            font-weight: 300;
            height: 40px;
            padding: 0 20px 0 80px;
            display: flex;
            align-items: center;
          }
          .tree-view_children-collapsed {
            height: 0px;
          }
          .tree-view_children .tree-view_image {
            display: none;
          }
          .tree-view_children .tree-view_item .node {
            font-weight: 400;
            font-size: 1.1em;
          }
          .tree-view_children .tree-view_item .node.category {
            font-size: 0.8em;
            padding-left: 45px;
            text-transform: uppercase;
          }
          .tree-view_children .tree-view_item {
            /* immediate child of .tree-view, for styling convenience */
            cursor: pointer;
            padding-left: 15px;
            height: 45px;
          }
          .tree-view_image {
            height: 35px;
            width: 35px;
            display: inline-block;
            position: relative;
            margin-right: 10px;
          }
          .reset-filters {
            min-height: 4%;
            background-color: #E7EBF7;
            font-size: 14px;
            padding-left: 20px;
            vertical-align: middle;
            cursor: pointer;
            padding-top: 10px;
          }
          .subcategory-name {
            display: inline-block;
            text-transform: upppercase;
          }
          .subcategory-name-active {
            border-left: 3px solid black;
            font-weight: 500;
            padding-left: 10px;
            text-transform: upppercase;
          }
        `}
        </style>
        <div className="primary-filter">
          <div className="gameFilterHeader" onClick={() => ::this.handleGameFilter(false)}>
            <FormattedMessage id="pages.marketplace.games" />
          </div>
          {this.state.gameFilter === false
          ? <TreeView
            key={'allItems'}
            nodeLabel={<span className="node">{'All Marketplace Items'}</span>}
            defaultCollapsed={this.state.gameFilter === false}
            onClick={() => ::this.handleGameFilter(false)}
            imgSource={'/static/images/icons/all_items.png'}
            noChevron={false}
            itemClassName={this.state.gameFilter === false ? 'treeview-active-item' : ''}
          />
          : null}
          {(loading && !(games && items)) ? <DataLoading /> : gameFilters.map((item, i) => {
            const { name, id, categories, imgSource } = item;
            const { gameFilter } = this.state;
            let gameFilterIsSelected = false;
            if (gameFilter !== false) {
              gameFilterIsSelected = gameFilter.toString() === id.toString();
            }
            if (gameFilter === false || gameFilterIsSelected === true) {
              return (
                <TreeView
                  key={name + '|' + i}
                  nodeLabel={<span className="node">{name}</span>}
                  defaultCollapsed={gameFilterIsSelected === false || !gameFilterIsSelected}
                  onClick={() => ::this.handleGameFilter(id)}
                  imgSource={imgSource}
                  noChevron={false}
                >
                <TreeView
                  key={'allItems' + i}
                  nodeLabel={<span className='node category'>All items</span>}
                  noChevron={false}
                  onClick={() => ::this.handlePrimaryCategories(false)}
                  itemClassName={gameFilterIsSelected && this.state.categories.length === 0 && this.state.secondaryCategories.length === 0 ? 'treeview-active-item' : ''}
                />
                  {categories.map(({ categoryName, subCategories }, i) => {
                    const filterColorIndex = i % filterColors.length;
                    const styles = {
                      color: filterColors[filterColorIndex],
                    };
                    return (
                      <TreeView
                        defaultCollapsed
                        nodeLabel={<span className="node category" style={styles}>{categoryName}</span>}
                        key={categoryName}
                        itemClassName={intersection(this.state.categories, subCategories).length > 0 ? 'treeview-active-item' : ''}
                        chevronSize={15}
                      >
                      {
                        subCategories.map(subCategory => {
                          return (
                            <div key={subCategory}
                            className="info"
                            onClick={() => ::this.handlePrimaryCategories(subCategory, id)}>
                            <span className={this.state.categories.includes(subCategory)
                            ? 'subcategory-name-active'
                            : 'subcategory-name'}>{subCategory}</span>
                            </div>
                          );
                        })
                      }
                      </TreeView>
                    );
                  })}
                </TreeView>
              );
            }
          }
          )}
        </div>
        {this.state.categories.length === 0
        ? null
        : this.renderSecondaryFilters(gameFilters.find(f => f.id === this.state.gameFilter))}
        {this.state.categories.length === 0
        ? null
        : <div className="reset-filters" onClick={() => ::this.handleGameFilter(false)}>
          RESET ALL FILTERS
        </div>}
      </div>
    );
  }

  renderItemGrid(items, games, refetch, loading = false) {
    if (loading) return <DataLoading />;
    if (!(items && items.length && games && games.length)) return this.renderEmpty();

    const gameIdsWithItems = uniq(map(path(['game', 'id']), items));
    const visibleGames = filter(g => contains(g.id, gameIdsWithItems), games);

    const filteredGame = visibleGames.find(game => parseInt(game.id, 10) === parseInt(this.state.gameFilter, 10));

    return (
      <div className={this.state.mobile ? 'filtered-mobile-market' : 'filtered-market'}>
        <style jsx>{`
          .filtered-market {
            width: 100%;
            padding: 25px 50px;
            background-color: #F5F7FB;
          }
          .filtered-mobile-market {
            width: 100%;
            margin: 0 auto;
            background-color: #F5F7FB;
            text-align: center;
          }
          .current-game-filter {
            height: 80px;
            font-size: 1.6em;
            font-weight: 500;
            line-height: 70px;
            background-color: #F5F7FB;
          }
          .current-mobile-game-filter {
            height: 80px;
            font-size: 1.6em;
            font-weight: 500;
            line-height: 70px;
            background-color: #F5F7FB;
          }
          :global(.current-game-filter .dropdown, .current-mobile-game-filter .dropdown) {
            float: right;
            margin: 25px 50px 0 0;
          }
          :global(.current-game-filter .sort-dropdown, .current-mobile-game-filter .sort-dropdown) {
            border: 0;
            background: transparent !important; /* Boostrap override */
            background-color: transparent !important; /* Boostrap override */
            box-shadow: none !important; /* Boostrap override */
            font-weight: 500 !important;
          }
          :global(.sort-dropdown .caret) {
            margin-left: 2px !important;
          }
          .inventory-items {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
          }
        `}</style>
        <div className={this.state.mobile ? 'current-mobile-game-filter' : 'current-game-filter'}>
          <span>{filteredGame ? filteredGame.name : 'Items'}</span>
          <DropdownButton title={this.state.itemsSortTitle} className="sort-dropdown" id="marketplace-sort-dropdown">
            <MenuItem eventKey="1" onSelect={(key, evt) => ::this.setState({
              itemsSort: [['saleExpiration', 'ASC']],
              itemsSortTitle: 'Newest',
            })}>Newest</MenuItem>
            <MenuItem eventKey="3" onSelect={(key, evt) => ::this.setState({
              itemsSort: [['salePrice', 'ASC']],
              itemsSortTitle: 'Price: Low to High',
            })}>Price: Low to High</MenuItem>
            <MenuItem eventKey="4" onSelect={(key, evt) => ::this.setState({
              itemsSort: [['salePrice', 'DESC']],
              itemsSortTitle: 'Price: High to Low',
            })}>Price: High to Low</MenuItem>
          </DropdownButton>
        </div>
        <div className="inventory-items">
          {visibleGames.map(game =>
            this.renderItems(game, items.filter(item => item.game.id === game.id), refetch)
          )}
        </div>
      </div>
    );
  }

  renderItems(game, items, refetch) {
    const { mobile } = this.props.layout.type;
    const maxStats = calcMaxItemsStats(items);
    let filteredItems = null;
    if (this.state.gameFilter !== null) {
      filteredItems = items.filter(item => Object.keys(this.state.gameFilter).includes(item.game.id) ? this.state.gameFilter[item.game.id].filter(x => !!~item.categories.indexOf(x)).length : true);
    } else {
      filteredItems = items;
    }
    return filteredItems.map(item => (
        <div
          className={cx({
            'item-wrapper-desktop': !mobile,
            'item-wrapper-mobile': mobile,
          })}
          key={item.tokenId}
        >
          <style jsx>{`
            .item-wrapper-desktop {
              display: inline-block;
              margin: 0 20px 0 0;
            }
            .item-wrapper-mobile {
              display: inline-block;
              margin: 0 20px;
            }
          `}</style>
          <MarketplaceItem
            key={item.tokenId}
            item={item}
            game={game}
            maxStats={maxStats}
            handler={::this.handlePrimaryCategories}
            onBuy={::this.handleBuy(refetch)}
          />
        </div>
      )
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
        .mobile-market .empty {
          display: flex;
          text-align: center;
          align-items: center;
          vertical-align: middle;
          justify-content: center;
          height: 100%
        }
        .mobile-market .empty h2 {
          font-size: 1em;
        }
        .mobile-market .empty img {
          height: 220px;
          width: 220px;
          margin: 40px;
        }
        .mobile-market .empty p {
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
    const { games, user } = this.props;

    if (!games || !user) return <DataLoading />;
    if (games.error) return <div>Error!</div>;

    let { listGames } = games;
    let { viewUserByWallet } = user;
    return (
      <Query
        query={queries.listMarketplaceItems}
        variables={{
          userId: (viewUserByWallet) ? viewUserByWallet.id : null,
          language: (viewUserByWallet) ? viewUserByWallet.language : null,
          gameId: this.state.gameFilter === false ? null : this.state.gameFilter,
          sort: this.state.itemsSort,
          andNotCategories: this.state.secondaryCategories,
          categories: (!this.listMarketplaceItems) ? []
            : this.state.categories,
        }}
      >
        {({ loading, error, data, refetch }) => {
          if (error) return <DataError />;

          const { listMarketplaceItems } = data;
          // const listMarketplaceItems = itemList;

          if (!this.listMarketplaceItems || this.listMarketplaceItems.length === 0) {
            this.listMarketplaceItems = listMarketplaceItems;
          } else if (this.listMarketplaceItems[0].game.id !== this.state.gameFilter) {
            this.listMarketplaceItems = listMarketplaceItems;
          }

          const loadingAny = loading || games.loading || user.loading;

          return (
            <div className={this.state.mobile ? 'mobile-market' : 'marketplace'}>
              <style jsx>{`
              .marketplace {
                display: flex;
              }
              .mobile-market {
                display: flex;
                flex-direction: column;
              }
            `}</style>
              {this.renderPrimaryFilters(this.listMarketplaceItems, listGames, loadingAny)}
              {this.renderItemGrid(listMarketplaceItems, listGames, refetch, loadingAny)}
            </div>
          );
        }}
      </Query>
    );
  };
};

export default compose(
  viewUserByWalletQuery,
  listGamesQuery,
)(Market);
