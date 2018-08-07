import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as log from 'loglevel';

import {
  compose,
  graphql,
} from 'react-apollo';

import {
  getMarketplaceContractAddress,
  getContractFromGame,
} from '@/shared/utils/network';

import {
  localQueries,
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import {
  listItem,
  extendItem,
  withdrawItem,
} from '@/shared/utils/contracts';

import style from '@/shared/constants/style';

import Gift from '@/components/popups/gift';
import ItemPopup from '@/components/popups/itempopup';

import Item from './Item';
import ItemBase from './ItemBase';

@injectIntl
class InventoryItem extends ItemBase {
  static propTypes = {
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
      saleExpiration: PropTypes.string,
      saleState: PropTypes.string,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    maxStats: PropTypes.number,
    gifts: PropTypes.shape({
      data: PropTypes.array,
    }),
    onSell: PropTypes.func,
    onBuy: PropTypes.func,
  };

  static defaultProps = {
    gifts: {
      data: null,
    },
  }

  state = {
    modal: null,
  };

  onHideModal() {
    this.setState({ modal: null });
  }

  async onSellSubmit(data) {
    const {
      item,
      game,
      user,
      onSell,
    } = this.props;

    const { network } = this.props.data;

    log.info('Beginning sell transaction...');
    const result = await listItem({
      user: user.viewUserByWallet,
      item,
      contract: getContractFromGame(game, network),
      to: getMarketplaceContractAddress(network),
      price: parseFloat(data.sellPrice),
    });

    if (onSell) onSell(item, result);
  }

  renderPresaleButton() {
    return (
      <Button style={{
        color: 'gold',
        backgroundColor: 'rgb(49,75,136)',
        height: '30px',
        width: '100%',
        focus: 0,
        cursor: 'default',
        borderBottomRightRadius: '6px',
        borderBottomLeftRadius: '6px',
      }}>PRESALE</Button>
    );
  }

  renderButtons() {
    const { gifts, item, game } = this.props;
    const gift = gifts.data && gifts.data.find(gift => gift.item === item.tokenId && gift.game === game.id);
    if (gift) {
      return (
        <div className="tx">
          <FormattedMessage id="pages.inventory.tx" />
        </div>
      );
    }

    let bottomBar = null;
    switch (item.saleState) {
      case 'listed':
        bottomBar = (
          <>
            {this.extendButton({ side: 'left', salePrice: item.salePrice })}
            {this.withdrawButton({ side: 'right' })}
          </>
        );
        break;
      case 'salepending':
        bottomBar = this.inProgressBar('sale-in-progress');
        break;
      case 'listpending':
        bottomBar = this.inProgressBar('list-in-progress');
        break;
      case 'withdrawpending':
        bottomBar = this.inProgressBar('extend-in-progress');
        break;
      case 'extendpending':
        bottomBar = this.inProgressBar('withdraw-in-progress');
        break;
      case 'sold':
        if (game.listed) {
          bottomBar = (
            <>
              {this.sellButton({ side: 'left', onClick: () => ::this.setState({ modal: 'sell' }) })}
              {this.giftButton({ side: 'right', onClick: () => ::this.setState({ modal: 'gift' }) })}
            </>
          );
        } else {
          bottomBar = (<>{this.giftButton({ onClick: () => ::this.setState({ modal: 'gift' }) })}</>);
        }
        break;
      default:
        bottomBar = null;
    }

    return (
      <div className="item-button-bar">
        <style jsx>{`
          .item-button-bar {
            width: 100%;
            display: flex;
          }
        `}</style>
        {bottomBar}
      </div>
    );
  }

  render() {
    const { item, game, user } = this.props;
    return (
      <div className="inventory-item">
        <style jsx>{`
          .inventory-item {
            display: inline-block;
            margin: 0 10px;
          }
        `}</style>
        <Gift
          show={this.state.modal === 'gift'}
          item={item} game={game} onHide={::this.onHideModal} />
        <ItemPopup
          show={this.state.modal === 'sell'}
          type="sell"
          item={item}
          game={game}
          onHide={::this.onHideModal}
          onSubmit={::this.onSellSubmit}
        />
        <ItemPopup
          show={this.state.modal === 'renew'}
          type="renew"
          item={item}
          game={game}
          onHide={::this.onHideModal}
        />
        <ItemPopup
          show={this.state.modal === 'withdraw'}
          type="withdraw"
          item={item}
          game={game}
          onHide={::this.onHideModal}
        />
        <Item
          item={item}
          user={user}
          buttons={item.presale ? ::this.renderPresaleButton() : ::this.renderButtons()}
        />
      </div>
    );
  }
}


export default compose(
  viewUserByWalletQuery,
  graphql(localQueries.root),
)(InventoryItem);
