import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { path } from 'ramda';
import * as log from 'loglevel';
import Router from 'next/router';

import {
  getContractFromGame,
} from '@/shared/utils/network';

import {
  buyItem,
} from '@/shared/utils/contracts';

import style from '@/shared/constants/style';

import ItemPopup from '@/components/popups/itempopup';

import Item from './Item';
import ItemBase from './ItemBase';


@injectIntl
class MarketplaceItem extends ItemBase {
  static propTypes = {
    dispatch: PropTypes.func,
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    maxStats: PropTypes.number,
    user: PropTypes.object,
    handler: PropTypes.func,
  };

  state = {
    buy: false,
  };

  onShowBuy(e) {
    e.preventDefault();
    if (!this.props.ctx.me) {
      Router.push('/login');
    }

    this.setState({ buy: true });
  }

  onHideBuy() {
    this.setState({ buy: false });
  }

  async onSubmit() {
    const { data, game, item, ctx, onBuy } = this.props;
    const { network } = data;

    const results = await buyItem({
      network,
      user: ctx.me,
      item,
      price: parseFloat(item.salePrice || 0, 10),
      contract: getContractFromGame(game, network),
    });
    log.info('Instantiating buy transaction...');
    if (onBuy) onBuy(item, results);
  }

  renderButtons() {
    const { item, ctx } = this.props;
    const lastOwner = path(['lastOwner', 'id'], item);
    const userId = path(['me', 'id'], ctx);

    const extendAndWithdrawButtons = (
      <div className="item-button-bar">
        {this.extendButton({ side: 'left', salePrice: item.salePrice })}
        {this.withdrawButton({ side: 'right' })}
      </div>
    );

    const buyButton = (
      <div className="item-button-bar">
        <button onClick={::this.onShowBuy} className="item-button-full">
          <style jsx global>{`
            .item-button-full {
              color: white;
              font-size: 0.75em;
              opacity: 1;
              height: 30px;
              width: 100%;
              border: 0;
              font-weight: 100;
              outline: 0;
              text-transform: uppercase;
            }
            .item-button-full, .item-button-full:hover, .item-button-full:focus {
              border-bottom-left-radius: 6px;
              border-bottom-right-radius: 6px;
              background-color: rgb(59, 90, 149);
            }
          `}</style>
          <span className="buy-for">
            <FormattedMessage className="buy-for" id="pages.marketplace.buy-for" />
          </span>
          <img src="/static/images/icons/plat.png" className="platToken" />
          <span className="buy-for">{item.salePrice ? item.salePrice : 0} PLAT</span>
        </button>
      </div>
    );

    return (
      <ButtonGroup justified>
        <style jsx>{`
          .item-button-bar {
            width: 100%;
            display: flex;
          }
        `}</style>
        {((lastOwner && userId) && (lastOwner === userId)) ? extendAndWithdrawButtons : buyButton}
      </ButtonGroup>
    );
  }

  render() {
    const { item, game, ctx } = this.props;
    return (
      <>
        <ItemPopup
          show={this.state.buy}
          type="buy"
          item={item}
          game={game}
          onHide={::this.onHideBuy}
          onSubmit={::this.onSubmit}
        />
        <Item
          item={item}
          user={ctx.me}
          buttons={::this.renderButtons()}
          handler={::this.props.handler}
        />
      </>
    );
  }
}


export default MarketplaceItem;
