import React from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';

import EthABI from 'ethereumjs-abi/index';

import { connect } from 'react-redux';

import {
  networkAddressMap,
  getERC721ConformingContract,
  getMarketplaceContract,
  getMarketplaceContractAddress,
  getBitGuildTokenContract,
} from '@/shared/utils/network';

import style from '@/shared/constants/style';

import BGButton from '@/components/bgbutton';

const testGameContractAddress = '0x856c82b392fa4041c3a63b3a8c8a7f258d2f27e0';
// const marketplaceContractAddress = '0x1062e88cea36123c9913acfda367dc3d7e480b1e';


@connect(
  state => ({
    gas: state.gas,
    network: state.network,
    account: state.account,
    user: state.user,
  })
)
class Web3SandboxPage extends React.Component {
  static propTypes = {
    account: PropTypes.object,
    network: PropTypes.object,
    user: PropTypes.object,
    gas: PropTypes.object,
  }

  dom = {
    list: {},
    withdraw: {},
    extend: {},
    buy: {},
  }

  addressInfo() {
    const { account } = this.props;
    return (
      <div className="web3-sandbox-card">
        <h3>Addresses</h3>
        <div>
          <h6>Main</h6>
          <ul>
            {Object.entries(networkAddressMap.main).map((entry, idx) => (
              <li key={idx}>
                {entry[0]}: {entry[1]}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6>Rinkeby</h6>
          <ul>
            {Object.entries(networkAddressMap.rinkeby).map((entry, idx) => (
              <li key={idx}>
                {entry[0]}: {entry[1]}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6>Other</h6>
          <ul>
            <li>current user: {account.wallet}</li>
            <li>TestGameContractAddress: {testGameContractAddress}</li>
          </ul>
        </div>
      </div>
    );
  }

  /*
   * List Item
   * 
   * - PLAT Price - must be big number (price * 1e18)
   * - gameContractAddress, tokenId - must be encoded
  **/
  onListItem() {
    const GameContract = getERC721ConformingContract(testGameContractAddress);

    const from = this.dom.list.from.value;
    const to = this.dom.list.to.value;
    const tokenId = this.dom.list.tokenId.value;
    const price = parseInt(this.dom.list.price.value, 10) * 1e18;;
    const currency = parseInt(this.dom.list.currency.value, 10);
    const dataBuffer = EthABI.rawEncode(['uint256', 'uint256'], [currency, price.toString()]);
    const dataHex = `0x${dataBuffer.toString('hex')}`;

    if (currency == 1) {
      console.log('un-implemented for eth');
      return; // do other stuff for ETH
    }

    log.info('from: ', from);
    log.info('to: ', to);
    log.info('tokenId: ', tokenId);
    log.info('price: ', price);
    log.info('currency: ', currency);
    log.info('dataBuffer: ', dataBuffer);
    log.info('dataHex: ', dataHex);

    /* Create item listing */
    GameContract.safeTransferFrom['address,address,uint256,bytes'](
      from,
      to,
      tokenId,
      dataHex,
      (err, tx) => {
        if (err) {
          log.error(err);
        } else {
          log.info('Success! Transaction: ', tx);
        }
      }
    );
  }

  listItemWorkflow() {
    const { account } = this.props;
    return (
      <div className="web3-sandbox-card">
        <h3>List Item for Sale</h3>
        <div>
          <label>from: </label><input ref={c => (this.dom.list.from = c)} /> current user: {account.wallet}
        </div>

        <div>
          <label>to: </label><input ref={c => (this.dom.list.to = c)} /> marketplace: {networkAddressMap.rinkeby.marketplace} (rinkeby)
        </div>

        <div>
          <label>tokenId: </label><input ref={c => (this.dom.list.tokenId = c)} /> ex: 1
        </div>

        <div>
          <label>currency: </label><input ref={c => (this.dom.list.currency = c)} /> ex: (0|1) - 0: PLAT, 1: ETH
        </div>

        <div>
          <label>price: </label><input ref={c => (this.dom.list.price = c)} /> ex: 500000000000000000000
        </div>

        <br />

        <BGButton onClick={() => ::this.onListItem()}>List Item for Sale</BGButton>
      </div>
    );
  }

  onWithdrawItem() {
    const { network } = this.props;

    const MarketplaceContract = getMarketplaceContract(network);
    const gameContract = this.dom.withdraw.gameContract.value;
    const tokenId = this.dom.withdraw.tokenId.value;

    /* Withdraw item from marketplace */
    MarketplaceContract.withdrawItem(
      gameContract,
      tokenId,
      (err, res) => {
        console.log('withdraw');
        if (err) {
          console.error(err);
        } else {
          console.log('worked!', res);
        }
      });
  }

  withdrawItemWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Withdraw Item from Marketplace</h3>
        <div>
          <label>gameContract: </label><input ref={c => (this.dom.withdraw.gameContract = c)} />
        </div>
        <div>
          <label>tokenId: </label><input ref={c => (this.dom.withdraw.tokenId = c)} />
        </div>

        <br />

        <BGButton onClick={() => ::this.onWithdrawItem()}>Withdraw Item from Marketplace</BGButton>
      </div>
    );
  }

  /*
   * Buy Item
   * 
   * - PLAT Price - must be big number (price * 1e18)
   * - gameContractAddress, tokenId - must be encoded
  **/
  onBuyItem() {
    const { network } = this.props;

    const currency = parseInt(this.dom.buy.currency.value, 10) || 0;
    const price = parseInt(this.dom.buy.price.value, 10) * 1e18;
    const tokenId = parseInt(this.dom.buy.tokenId.value, 10);
    const gameContractAddress = this.dom.buy.gameContract.value;


    if (currency == 1) {
      console.log('un-implemented for eth');
      return; // do other stuff for ETH
    }

    log.info('tokenId: ', tokenId);
    log.info('price: ', price);

    const BitGuildTokenContract = getBitGuildTokenContract(network);
    const marketplaceAddress = getMarketplaceContractAddress(network);
    log.info('BitGuildTokenContract: ', BitGuildTokenContract);

    const dataBuffer = EthABI.rawEncode(['address', 'uint256'], [gameContractAddress, tokenId]);
    const dataHex = `0x${dataBuffer.toString('hex')}`;

    log.info('gameContractAddress: ', gameContractAddress);
    log.info('marketplaceAddress: ', marketplaceAddress);
    log.info('tokenId: ', tokenId);
    log.info('price: ', price);
    log.info('currency: ', currency);
    log.info('dataBuffer: ', dataBuffer);
    log.info('dataHex: ', dataHex);

    /* Buy item from marketplace - new workflow */
    BitGuildTokenContract.approveAndCall(
      marketplaceAddress,
      price,
      dataHex,
      (err, tx) => {
        if (err) {
          log.error(err);
        } else {
          log.info('Transaction hash: ', tx);
        }
      }
    );

    return;
    /* Buy item from marketplace */
    BitGuildTokenContract.approveAndCall(
      getMarketplaceContractAddress(network),
      price,
      listingId,
      (err, tx) => {
        if (err) {
          log.error(err);
        } else {
          log.info('Transaction hash: ', tx);
        }
      }
    );
  }

  buyItemWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Buy Item from Marketplace</h3>
        <div>
          <label>tokenId: </label><input ref={c => (this.dom.buy.tokenId = c)} />
        </div>
        <div>
          <label>gameContract: </label><input ref={c => (this.dom.buy.gameContract = c)} />
        </div>
        <div>
          <label>currency: </label><input ref={c => (this.dom.buy.currency = c)} /> Ex: (0|1) (PLAT|ETH)
        </div>
        <div>
          <label>price: </label><input ref={c => (this.dom.buy.price = c)} />
        </div>

        <br />

        <BGButton onClick={() => ::this.onBuyItem()}>Buy Item from Marketplace</BGButton>
      </div>
    );
  }


  onExtendItem() {
    const { network } = this.props;

    const MarketplaceContract = getMarketplaceContract(network);
    const gameContract = this.dom.extend.gameContract.value;
    const tokenId = this.dom.extend.tokenId.value;

    log.info('Extending listing...');
    log.info('MarketplaceContract: ', MarketplaceContract);
    log.info('gameContract: ', gameContract);
    log.info('tokenId: ', tokenId);

    /* Extend item from marketplace */
    MarketplaceContract.extendItem(
      gameContract,
      tokenId,
      (err, res) => {
        console.log('extend');
        if (err) {
          console.error(err);
        } else {
          console.log('worked!', res);
        }
      });
  }

  extendItemWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Extend Item in Marketplace</h3>
        <div>
          <label>gameContract: </label><input ref={c => (this.dom.extend.gameContract = c)} />
        </div>
        <div>
          <label>tokenId: </label><input ref={c => (this.dom.extend.tokenId = c)} />
        </div>

        <br />

        <BGButton onClick={() => ::this.onExtendItem()}>Extend Item in Marketplace</BGButton>
      </div>
    );
  }


  componentDidMount() {
    window.EthABI = EthABI;
  }


  render() {
    return (
      <div className="web3-sandbox">
        <style jsx>{`
          .web3-sandbox {
            margin: 40px;
            // display: flex;
            background: ${style.colors.background};
          }
          .key {
            width: calc(40% - 20px);
            float: right;
            margin-left: 20px;
          }
          .workflows {
            width: 60%;
            float: left;
          }
        `}</style>
        <style jsx global>{`
          .web3-sandbox label {
            min-width: 150px;
          }
          .web3-sandbox input {
            min-width: 250px;
            margin-right: 20px;
          }
          .web3-sandbox .web3-sandbox-card {
            padding: 20px;
            margin: 10px 10px 40px 10px;
            box-shadow: ${style.boxShadow.default};
          }
          .web3-sandbox .web3-sandbox-card h3 {
            margin: 0 0 20px 0;
          }
        `}</style>
        <h1>Web3 Sandbox</h1>

        <div className="workflows">
          {::this.listItemWorkflow()}
          {::this.buyItemWorkflow()}
          {::this.withdrawItemWorkflow()}
          {::this.extendItemWorkflow()}
        </div>

        <div className="key">
          {::this.addressInfo()}
        </div>
      </div>
    );
  }
}


export default process.env.NODE_ENV === 'production' ? <div>Not Allowed</div> : Web3SandboxPage;
