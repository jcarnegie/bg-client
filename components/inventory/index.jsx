/*
 * TODO - Modularize sub-components for re-use
**/
import React, {Component, Fragment} from "react";
import {Button, Image, Row, Tab, Tabs} from "react-bootstrap";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import {contains, filter, flatten, map, path, uniq, values} from "ramda";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";
import {compose} from "react-apollo";

import {
  viewGameBySlugQuery,
  viewUserByWalletQuery,
  listGamesQuery,
  listItemsQuery,
} from "@/shared/utils/apollo";

import {featureOn} from "@/shared/utils";

import {calcMaxItemsStats, isValidItemCategory} from "@/client/utils/item";
import DataLoading from "@/components/DataLoading";

import {InventoryItem as Item} from "@/components/item";


@injectIntl
class Inventory extends Component {
	static propTypes = {
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
	};

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
    const {items, games, user} = this.props;

    if (!user.viewUserByWallet && !user.loading) Router.push("/");

    if (user.loading || items.loading || games.loading) return <DataLoading />;
    if (user.error || items.error || games.error) return <div>error!</div>;

		return items.listItems && items.listItems.length ? this.renderTabs(games.listGames, items.listItems) : this.renderEmpty();
	}

	renderBackToGameButton() {
    const {game} = this.props;
    if (!game || (game && !game.viewGameBySlug)) return null;

		return (
			<div className="pull-right">
				<Link href={`/game/${game.viewGameBySlug.slug}`}>
					<a>
						<Button><FormattedMessage id="pages.inventory.back-to-game" /></Button>
					</a>
				</Link>
			</div>
		);
	}

  renderCategories(game, categories) {
    if (!categories.length) {
      return null;
    }

    return (
      <>
        <Button onClick={::this.onClick(game.id, categories)} bsStyle="link">
          <FormattedMessage id="pages.inventory.all" />
        </Button>
        {categories
          .filter(isValidItemCategory)
          .map((category, i) =>
            <Button key={i} onClick={::this.onClick(game.id, [category])} bsStyle="link">
              {category}
            </Button>
          )}
      </>
    );
  }

	renderTab(game, items) {
		const attrs = flatten(items.map(item => values(item.attrs || {})));
		const maxStats = calcMaxItemsStats(items);
		const categories = uniq(attrs.map(attr => attr.value));

    return (
      <Fragment key={game.id}>
        <div className="arrow-right pull-right">
          {this.renderCategories(game, categories)}
        </div>
        <h3>{game.name}</h3>
        <Row className="flex-row">
          {items.filter(item => Object.keys(this.state.filters).includes(item.game.id) ? this.state.filters[item.game.id].filter(x => !!~item.categories.indexOf(x)).length : true)
            .map(item =>
              <Item key={item.tokenId} item={item} game={game} maxStats={maxStats} onClick={::this.onClick} />
            )}
        </Row>
      </Fragment>
    );
  }

	renderTabs(games, items) {
    const gameIdsWithItems = uniq(map(path(["game", "id"]), items));
    const visibleGames = filter(g => contains(g.id, gameIdsWithItems), games);

    return (
      <>
        <h2>
          <FormattedMessage id="pages.inventory.title" />
          {this.renderBackToGameButton()}
        </h2>
        <Tabs defaultActiveKey={1} id="inventory" onSelect={::this.onSelect}>
          <Tab eventKey={1} title={<FormattedMessage id="pages.inventory.all-items" />}>
            {visibleGames.map(game =>
              this.renderTab(game, items.filter(item => item.game.id === game.id))
            )}
          </Tab>
          {visibleGames.map((game, i) =>
            <Tab eventKey={i + 3} title={game.name || game.slug} key={game.id}>
              {this.renderTab(game, items.filter(item => item.game.id === game.id))}
            </Tab>
          )}
          {featureOn("marketplace") ? (
            <Tab eventKey={2} title={<FormattedMessage id="pages.inventory.on-sale" />}>
              {visibleGames.map(game =>
                this.renderTab(game, items.filter(item => item.game.id === game.id))
              )}
            </Tab>
            ) : null
          }
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
					<Image src="/static/images/misc/empty-box.png" />
					<p>
						<FormattedHTMLMessage id="pages.inventory.faq" />
					</p>
				</div>
			</div>
		);
	}


	render() {
    return (
			<div className="inventory">
				{this.indexStyle()}
				{this.flexStyle()}
				{::this.renderInventory()}
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
          color: #130029;
          font-weight: 400;
        }
        .inventory .arrow-right button:hover {
          color: #130029;
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
}


export default compose(
  viewUserByWalletQuery,
  viewGameBySlugQuery,
  listGamesQuery,
  listItemsQuery,
)(Inventory);
