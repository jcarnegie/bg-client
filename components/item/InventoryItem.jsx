import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as log from 'loglevel';
import nftABI from '@/shared/contracts/ERC721/abi.json';

import {
  getMarketplaceContractAddress,
  getContractFromGame,
} from '@/shared/utils/network';

import {
  listItem,
} from '@/shared/utils/contracts';

import {
  getConfigForGame,
} from '@/shared/utils/games';

import style from '@/shared/constants/style';
import ItemPopup from '@/components/popups/itempopup';

import { withGlobalContext } from '@/shared/utils/context';
import { withRoot } from '@/components/wrappers';

import Item from './Item';
import ItemBase from './ItemBase';

@connect()
@injectIntl
@withGlobalContext
@withRoot
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
    root: PropTypes.object,
    ctx: PropTypes.shape({
      isCurrentWalletLinked: PropTypes.bool,
      userNeedsToLogInOrRegister: PropTypes.bool,
      me: PropTypes.object,
    }),
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
      onSell,
      root,
    } = this.props;

    const { me } = this.props.ctx;
    const { network } = root;

    log.info('Beginning sell transaction...');
    const result = await listItem({
      user: me,
      item,
      contract: getContractFromGame(game, network),
      to: getMarketplaceContractAddress(network),
      price: parseFloat(data.sellPrice),
    });

    if (onSell) onSell(item, result);
  }

  isValid(wallet) {
    const { intl } = this.props;

    let e;
    let isValid = true;

    if (!window.web3.isAddress(wallet)) {
      e.parentNode.parentNode.classList.add('has-error');
      e.setCustomValidity(intl.formatMessage({
        id: 'fields.wallet.invalid',
      }));
      isValid = false;
    }

    return isValid;
  }

  async onGiftSubmit(data) {
    const {
      ctx,
      item,
      game,
      root,
    } = this.props;
    const { me } = ctx;

    const { network } = root;

    if (this.isValid(data.wallet)) {
      /* TODO - move to shared/utils/contracts.js */
      const contract = window.web3.eth.contract(nftABI).at(game.nft[network.id]);
      contract.safeTransferFrom(me.lastWalletUsed, data.wallet, item.tokenId, {
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(this.props.root.gas.average),
      },
        (error, tx) => {
          if (error) {
            log.error(error);
          } else {
            // TODO - add gift in apollo cache
            // payload: {
            //   item: item.tokenId,
            //   game: game.id,
            //   tx,
            // },
          }
        }
      );
    }
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
        if (getConfigForGame(game).showInMarketplace) {
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
    const { item, game } = this.props;
    const { me } = this.props.ctx;

    return (
      <div className="inventory-item">
        <style jsx>{`
          .inventory-item {
            display: inline-block;
            margin: 0 10px;
          }
        `}</style>
        <ItemPopup
          show={this.state.modal === 'gift'}
          type="gift"
          item={item}
          game={game}
          onHide={::this.onHideModal}
          onSubmit={::this.onGiftSubmit}
        />
        <ItemPopup
          show={this.state.modal === 'sell'}
          type="sell"
          item={item}
          game={game}
          onHide={::this.onHideModal}
          onSubmit={::this.onSellSubmit}
        />
        <Item
          item={item}
          user={me}
          buttons={item.presale ? ::this.renderPresaleButton() : ::this.renderButtons()}
        />
      </div>
    );
  }
}


export default InventoryItem;
