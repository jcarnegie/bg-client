import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  extendItem,
  withdrawItem,
} from '@/shared/utils/contracts';

import {
  getContractFromGame,
} from '@/shared/utils/network';


class ItemBase extends React.Component {
  static propTypes = {
    /* NOTE: provided by extending classes */
    root: PropTypes.object,
    game: PropTypes.object,
    item: PropTypes.object,
  }

  static defaultProps = {
    root: {},
    game: {},
    item: {},
  }

  async withdraw() {
    const { game, item, root: { network } } = this.props;
    await withdrawItem({
      contract: getContractFromGame(game, network),
      network,
      item,
    });
  }

  async extend() {
    const { game, item, root: { network } } = this.props;
    await extendItem({
      contract: getContractFromGame(game, network),
      network,
      item,
    });
  }

  /*
   * @param side {String} (left|right|center)
   * - TODO - render a bar conditionally based on number of buttons
   */
  actionButton(side = 'full', onClick = () => {}, children) {
    return (
      <button onClick={onClick} className={`item-button item-button-${side}`}>
        <style jsx>{`
          .item-button {
            color: white;
            font-size: 0.7em;
            opacity: 1;
            height: 30px;
            width: 50%;
            border: 0;
            font-weight: 100;
            outline: 0;
            text-transform: uppercase;
          }
          .item-button:hover {
            opacity: 0.9;
            color: white;
          }
          .item-button-full, .item-button-full:hover, .item-button-full:focus {
            width: 100%;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            background-color: rgb(59, 90, 149);
          }
          .item-button-left, .item-button-left:hover, .item-button-left:focus {
            border-bottom-left-radius: 6px;
            background-color: rgb(59, 90, 149);
          }
          .item-button-right, .item-button-right:hover, .item-button-right:focus {
            background-color: rgb(80, 130, 206);
            border-bottom-right-radius: 6px;
          }
        `}</style>
        {children}
      </button>
    );
  }


  inProgressBar(txt) {
    return (
      <div className="in-progress-bar">
        <style jsx>{`
          .in-progress-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #F68F11;
            font-size: 0.8em;
            opacity: 1;
            height: 30px;
            width: 100%;
            border: 0;
            font-weight: 100;
            outline: 0;
            text-transform: uppercase;
          }
        `}</style>
        <FormattedMessage id={`pages.inventory.${txt}`} />
      </div>
    );
  }

  extendButton({ side, salePrice, onClick = () => ::this.extend() }) {
    return ::this.actionButton(side, onClick, <FormattedMessage id="pages.marketplace.renew" />);
  };

  withdrawButton({ side, onClick = () => ::this.withdraw() }) {
    return ::this.actionButton(side, onClick, <FormattedMessage id="pages.marketplace.withdraw" />);
  }

  sellButton({ side, onClick = () => {} }) {
    return ::this.actionButton(side, onClick, <FormattedMessage id="global.sell" />);
  }

  giftButton({ side, onClick = () => {} }) {
    return ::this.actionButton(side, onClick, <FormattedMessage id="global.gift" />);
  }

  render() {
    return null;
  }
}


export default ItemBase;
