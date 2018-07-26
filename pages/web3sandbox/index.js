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

import {
  buyItem,
  listItem,
  extendItem,
  withdrawItem,
  getFee,
} from '@/shared/utils/contracts';

import style from '@/shared/constants/style';

import BGButton from '@/components/bgbutton';

const testGameContractAddress = '0x856c82b392fa4041c3a63b3a8c8a7f258d2f27e0';
const etherOnlineRinkeby = '0xca68213bce717c256628936a9ea4570f52ab2ed2';


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
    fee: {},
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
            <li>etherOnlineRinkeby: {etherOnlineRinkeby}</li>
          </ul>
        </div>
      </div>
    );
  }

  async onListItem() {
    const { user } = this.props;
    const contract = this.dom.list.contract.value;
    const to = this.dom.list.to.value;
    const itemId = this.dom.list.itemId.value;
    const tokenId = this.dom.list.tokenId.value;
    const price = this.dom.list.price.value;
    const currency = this.dom.list.currency.value;

    /* Create item listing */
    const res = await listItem({
      user,
      item: { id: itemId, tokenId },
      contract,
      to,
      price,
      currency,
    });
    log.info('Sandbox listItem done.', res);
  }

  listItemWorkflow() {
    const { account } = this.props;
    return (
      <div className="web3-sandbox-card">
        <h3>List Item for Sale</h3>
        <div className="web3-sandbox-card-row">
          <label>contract: </label><input ref={c => (this.dom.list.contract = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>to: </label><input ref={c => (this.dom.list.to = c)} /> mktplce: {networkAddressMap.rinkeby.marketplace} (rinkeby)
        </div>
        <div className="web3-sandbox-card-row">
          <label>itemId: </label><input ref={c => (this.dom.list.itemId = c)} /> ex: 2
        </div>
        <div className="web3-sandbox-card-row">
          <label>tokenId: </label><input ref={c => (this.dom.list.tokenId = c)} /> ex: 1
        </div>
        <div className="web3-sandbox-card-row">
          <label>currency: </label><input ref={c => (this.dom.list.currency = c)} /> ex: (0|1) - 0: PLAT, 1: ETH
        </div>
        <div className="web3-sandbox-card-row">
          <label>price: </label><input ref={c => (this.dom.list.price = c)} /> ex: 5000
        </div>

        <br />

        <BGButton onClick={() => ::this.onListItem()}>List Item for Sale</BGButton>
      </div>
    );
  }

  async onWithdrawItem() {
    const { network } = this.props;

    const contract = this.dom.withdraw.gameContract.value;
    const tokenId = this.dom.withdraw.tokenId.value;
    const itemId = this.dom.withdraw.itemId.value;
    const marketPlaceContractAddress = this.dom.withdraw.marketPlaceContractAddress.value;

    const item = {
      id: itemId,
      tokenId,
    }

    /* Withdraw item from marketplace */
    const res = await withdrawItem({
      network,
      contract,
      item,
      marketPlaceContractAddress,
    });
    log.info('Sandbox withdrawItem: ', res);
  }

  withdrawItemWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Withdraw Item from Marketplace</h3>
        <div className="web3-sandbox-card-row">
          <label>gameContract: </label><input ref={c => (this.dom.withdraw.gameContract = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>itemId: </label><input ref={c => (this.dom.withdraw.itemId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>tokenId: </label><input ref={c => (this.dom.withdraw.tokenId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>marketPlaceContractAddress: </label><input ref={c => (this.dom.withdraw.marketPlaceContractAddress = c)} /> optional
        </div>
        <br />

        <BGButton onClick={() => ::this.onWithdrawItem()}>Withdraw Item from Marketplace</BGButton>
      </div>
    );
  }

  async onBuyItem() {
    const { user, network } = this.props;

    const price = parseInt(this.dom.buy.price.value, 10);
    const tokenId = parseInt(this.dom.buy.tokenId.value, 10);
    const itemId = parseInt(this.dom.buy.itemId.value, 10);
    const contract = this.dom.buy.gameContract.value;
    const bitGuildTokenContractAddress = this.dom.buy.bitGuildTokenContractAddress.value;
    const marketPlaceContractAddress = this.dom.buy.marketPlaceContractAddress.value;

    const item = {
      id: itemId, 
      tokenId, 
    };

    /* Buy item from Marketplace */
    const res = await buyItem({
      user,
      network,
      item,
      price,
      contract,
      bitGuildTokenContractAddress,
      marketPlaceContractAddress,
    });
    log.info('Sandbox buyItem: ', res);
  }

  buyItemWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Buy Item from Marketplace</h3>
        <div className="web3-sandbox-card-row">
          <label>tokenId: </label><input ref={c => (this.dom.buy.tokenId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>itemId: </label><input ref={c => (this.dom.buy.itemId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>gameContract: </label><input ref={c => (this.dom.buy.gameContract = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>price: </label><input ref={c => (this.dom.buy.price = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>bitGuildTokenContractAddress: </label><input ref={c => (this.dom.buy.bitGuildTokenContractAddress = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>marketPlaceContractAddress: </label><input ref={c => (this.dom.buy.marketPlaceContractAddress = c)} /> optional
        </div>
        <br />

        <BGButton onClick={() => ::this.onBuyItem()}>Buy Item from Marketplace</BGButton>
      </div>
    );
  }


  async onExtendItem() {
    const { network } = this.props;

    const contract = this.dom.extend.gameContract.value;
    const tokenId = this.dom.extend.tokenId.value;
    const itemId = this.dom.extend.itemId.value;
    const marketPlaceContractAddress = this.dom.extend.marketPlaceContractAddress.value;

    const item = {
      id: itemId,
      tokenId,
    }

    /* Extend item from marketplace */
    const res = await extendItem({
      network,
      contract,
      item,
      marketPlaceContractAddress,
    })
    log.info('Sandbox extendItem: ', res);
  }

  extendItemWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Extend Item in Marketplace</h3>
        <div className="web3-sandbox-card-row">
          <label>gameContract: </label><input ref={c => (this.dom.extend.gameContract = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>itemId: </label><input ref={c => (this.dom.extend.itemId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>tokenId: </label><input ref={c => (this.dom.extend.tokenId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>marketPlaceContractAddress: </label><input ref={c => (this.dom.extend.marketPlaceContractAddress = c)} /> optional
        </div>
        <br />

        <BGButton onClick={() => ::this.onExtendItem()}>Extend Item in Marketplace</BGButton>
      </div>
    );
  }

  async onGetFee() {
    const { network } = this.props;

    const price = this.dom.fee.price.value;
    const buyer = this.dom.fee.buyer.value;
    const seller = this.dom.fee.seller.value;
    const contract = this.dom.fee.contract.value;

    /* Get fee from marketplace */
    const res = await getFee({
      network,
      price,
      buyer,
      seller,
      contract,
    })
    log.info('Sandbox getFee: ', res);
  }

  getFeeWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Get fee</h3>
        <div className="web3-sandbox-card-row">
          <label>price: </label><input ref={c => (this.dom.fee.price = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>buyer: </label><input ref={c => (this.dom.fee.buyer = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>seller: </label><input ref={c => (this.dom.fee.seller = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>contract: </label><input ref={c => (this.dom.fee.contract = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>marketPlaceContractAddress: </label><input ref={c => (this.dom.fee.marketPlaceContractAddress = c)} /> optional
        </div>

        <br />

        <BGButton onClick={() => ::this.onGetFee()}>Get fee</BGButton>
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
            background: ${style.colors.background};
            font-size: 12px;
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
            min-width: 170px;
            text-overflow: ellipsis;
            overflow: hidden;
            margin: 0;
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
          .web3-sandbox-card-row {
            display: flex;
            align-items: center;
          }
        `}</style>
        <h1>Web3 Sandbox</h1>

        <div className="workflows">
          {::this.listItemWorkflow()}
          {::this.buyItemWorkflow()}
          {::this.withdrawItemWorkflow()}
          {::this.extendItemWorkflow()}
          {::this.getFeeWorkflow()}
        </div>

        <div className="key">
          {::this.addressInfo()}
        </div>
      </div>
    );
  }
}


export default process.env.DEPLOYED_ENV === 'production' ? <div>Not Allowed</div> : Web3SandboxPage;
