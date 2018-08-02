import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as log from 'loglevel';

import {
  getMarketplaceContractAddress,
  getContractFromGame,
} from '@/shared/utils/network';

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
@connect(
  state => ({
    gas: state.gas,
    network: state.network,
    user: state.user,
  })
)
class InventoryItem extends ItemBase {
  static propTypes = {
    gas: PropTypes.object,
    network: PropTypes.object,
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
      network,
      item,
      game,
      user,
      onSell,
    } = this.props;

    log.info('Beginning sell transaction...');

    const result = await listItem({
      user,
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
            {this.extendButton({ salePrice: item.salePrice })}
            {this.withdrawButton({})}
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
        bottomBar = (
          <>
            {this.sellButton({ onClick: () => ::this.setState({ modal: 'sell' }) })}
            {this.giftButton({ onClick: () => ::this.setState({ modal: 'gift' }) })}
          </>
        );
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
    const { item, game } = this.props;
    return (
      <div>
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
          buttons={item.presale ? ::this.renderPresaleButton() : ::this.renderButtons()}
        />
      </div>
    );
  }
}


export default InventoryItem;
