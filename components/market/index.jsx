import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";
import {Image, Row} from "react-bootstrap";
import {connect} from "react-redux";
// import Link from "next/link";
import {contains, filter, flatten, map, path, uniq, values} from "ramda";
// import Router from "next/router";
import TreeView from "@/components/treeview/treeview";

import {compose} from "react-apollo";

import {
  listGamesQuery,
  listItemsQuery,
  viewUserByWalletQuery,
} from "@/shared/utils/apollo";

import {
  calcMaxItemsStats,
  // isValidItemCategory,
  isStat,
} from "@/client/utils/item";
import {MarketplaceItem as Item} from "@/components/item";

import itemList from "./items.test.json";

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
    })
  }

  state = {
    filters: {},
  }

  renderFilters() {
    const {games} = this.props;
    const items = itemList;
    const attrs = flatten(items.map(item => {
      let values = Object.values(item.attrs || {});
      values.forEach(value => {value.game = item.game.id})
      return values;
    }));

    let dataSource = [];
    games.listGames.forEach(game => {
      dataSource.push({
        game: game.name,
        id: "1",
        collapsed: true,
        categories: [
        ],
      });
    });
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
    dataSource.forEach(game => {
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
            flex: 0 0 200px;
          }
          .gameFilterHeader{
            width: 100%;
            display: inline-block;
            text-align: center;
            border-bottom: 1px solid #EEEEEE;
            border-right: 1px solid #EEEEEE;
          }
        `}
        </style>
        <style global jsx>{`
          .tree-view {
            overflow-y: hidden;
          }

          .tree-view_item {
            /* immediate child of .tree-view, for styling convenience */
            cursor: pointer;
            border-bottom: 1px solid #EEEEEE;
            border-right: 1px solid #EEEEEE;
          }

          /* style for the children nodes container */
          .tree-view_children {
            margin-left: 16px;
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
        {dataSource.map((node, i) => {
          const name = node.game;
          const label = <span className="node">{name}</span>;
          return (
            <TreeView key={name + "|" + i} nodeLabel={label} defaultCollapsed={true}>
              {node.categories.map(category => {
                const label2 = <span className="node">{category.categoryName}</span>;
                return (
                  <TreeView nodeLabel={label2} key={category.categoryName} defaultCollapsed={true}>
                  {
                    category.subCategories.map(subCategory => {
                      return (
                        <div key={subCategory} className="info">{subCategory}</div>
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

  renderMarket() {
    // const {items, games} = this.props;
    const {games} = this.props;
    const items = itemList;

    return items.length ? this.renderItems(items, games.listGames) : this.renderEmpty();
  }

  renderItems() {
    const {games} = this.props;
    // saving for pattern
    // const items = this.props.items.listItems || [];
    const items = itemList;
    const gameIdsWithItems = uniq(map(path(["game", "id"]), items));
    const visibleGames = filter(g => contains(g.id, gameIdsWithItems), games.listGames);

    return (
      <div>
        {visibleGames.map(game =>
          this.renderItem(game, items.filter(item => item.game.id === game.id))
        )}
      </div>
    );
  }

  renderItem(game, items) {
    // console.log(items)
    items = items || [];
		// const attrs = flatten(items.map(item => values(item.attrs || {})));
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
