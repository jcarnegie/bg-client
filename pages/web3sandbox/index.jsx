import React from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';

import EthABI from 'ethereumjs-abi/index';

import {
  compose,
  graphql,
} from 'react-apollo';

import {
  networkAddressMap,
  // getERC721ConformingContract,
  // getMarketplaceContract,
  // getMarketplaceContractAddress,
  // getBitGuildTokenContract,
} from '@/shared/utils/network';


import {
  buyItem,
  buyItemWithEther,
  listItem,
  extendItem,
  withdrawItem,
  getFee,
  dataHexForCurrencyAndPrice,
  dataHexForContractAndTokenId,
} from '@/shared/utils/contracts';

import { withGlobalContext } from '@/shared/utils/context';
import { withRoot } from '@/components/wrappers';

import style from '@/shared/constants/style';

import BGButton from '@/components/bgbutton';

const testGameContractAddress = '0x856c82b392fa4041c3a63b3a8c8a7f258d2f27e0';
const etherOnlineRinkeby = '0xca68213bce717c256628936a9ea4570f52ab2ed2';

@withGlobalContext
@withRoot
class Web3SandboxPage extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
    ctx: PropTypes.shape({
      isCurrentWalletLinked: PropTypes.bool,
      userNeedsToLogInOrRegister: PropTypes.bool,
      me: PropTypes.object,
    }),
    root: PropTypes.object,
  }

  state = {
    listCurrency: 0,
    listPrice: 0,
    buyTokenId: 0,
    buyContractAddress: '',
  }

  dom = {
    list: {},
    withdraw: {},
    extend: {},
    buy: {},
    buyWithEther: {},
    fee: {},
  }

  addressInfo() {
    const { wallet } = this.props.root;
    return (
      <div className="web3-sandbox-card">
        <h3>Addresses</h3>
        <div>
          <h6>User</h6>
          <ul>
            <li><strong>Wallet:</strong> {wallet}</li>
          </ul>
        </div>
        <div>
          <h6>Main</h6>
          <ul>
            {Object.entries(networkAddressMap.main).map((entry, idx) => (
              <li key={idx}>
                <strong>{entry[0]}:</strong> {entry[1]}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6>Rinkeby</h6>
          <ul>
            {Object.entries(networkAddressMap.rinkeby).map((entry, idx) => (
              <li key={idx}>
                <strong>{entry[0]}:</strong> {entry[1]}
              </li>
            ))}
            <li><strong>Ether.Online Rinkeby:</strong> {etherOnlineRinkeby}</li>
            <li><strong>TestGame:</strong> {testGameContractAddress}</li>
          </ul>
        </div>
      </div>
    );
  }

  async onListItem() {
    const { me } = this.props.ctx;

    const { gas, network } = this.props.root;
    const contract = this.dom.list.contract.value;
    const to = this.dom.list.to.value;
    const itemId = this.dom.list.itemId.value;
    const tokenId = this.dom.list.tokenId.value;
    const price = this.dom.list.price.value;
    const currency = this.dom.list.currency.value;

    /* Create item listing */
    const res = await listItem({
      user: me,
      item: { id: itemId, tokenId },
      contract,
      to,
      price,
      currency,
      network,
      gas,
    });
    log.info('Sandbox listItem done.', res);
  }

  listItemWorkflow() {
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
          <label>currency: </label><input ref={c => (this.dom.list.currency = c)} onChange={() => this.setState({ listCurrency: this.dom.list.currency.value })} /> ex: (0|1) - 0: PLAT, 1: ETH
        </div>
        <div className="web3-sandbox-card-row">
          <label>price: </label><input ref={c => (this.dom.list.price = c)} onChange={() => this.setState({ listPrice: this.dom.list.price.value })} /> ex: 5000
        </div>
        <br />
        <p>dataHex: {dataHexForCurrencyAndPrice({ currency: this.state.listCurrency, price: this.state.listPrice })}</p>
        <BGButton onClick={() => ::this.onListItem()}>List Item for Sale</BGButton>
      </div>
    );
  }

  async onWithdrawItem() {
    const { network, gas } = this.props.root;

    const contract = this.dom.withdraw.gameContract.value;
    const tokenId = this.dom.withdraw.tokenId.value;
    const itemId = this.dom.withdraw.itemId.value;
    const marketPlaceContractAddress = this.dom.withdraw.marketPlaceContractAddress.value;

    const item = {
      id: itemId,
      tokenId,
    };

    /* Withdraw item from marketplace */
    const res = await withdrawItem({
      network,
      contract,
      item,
      marketPlaceContractAddress,
      gas,
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
    const { me } = this.props.ctx;
    const { network, gas } = this.props.root;

    const price = parseFloat(this.dom.buy.price.value, 10);
    const tokenId = parseInt(this.dom.buy.tokenId.value, 10);
    const itemId = parseInt(this.dom.buy.itemId.value, 10);
    const contract = this.dom.buy.gameContract.value;
    const marketPlaceContractAddress = this.dom.buy.marketPlaceContractAddress.value;

    const item = {
      id: itemId,
      tokenId,
    };

    /* Buy item from Marketplace */
    const res = await buyItem({
      user: me,
      network,
      item,
      price,
      contract,
      marketPlaceContractAddress,
      gas,
    });
    log.info('Sandbox buyItem: ', res);
  }

  buyItemWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Buy Item from Marketplace</h3>
        <div className="web3-sandbox-card-row">
          <label>gameContract: </label>
          <input ref={c => (this.dom.buy.gameContract = c)} onChange={() => this.setState({ buyContractAddress: this.dom.buy.gameContract.value })} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>tokenId: </label>
          <input ref={c => (this.dom.buy.tokenId = c)} onChange={
            () => this.setState({ buyTokenId: this.dom.buy.tokenId.value })}
          />
        </div>
        <div className="web3-sandbox-card-row">
          <label>itemId: </label><input ref={c => (this.dom.buy.itemId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>price: </label><input ref={c => (this.dom.buy.price = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>marketPlaceContractAddress: </label><input ref={c => (this.dom.buy.marketPlaceContractAddress = c)} /> optional
        </div>
        <br />
        <p>dataHex: {dataHexForContractAndTokenId({ contract: this.state.buyContractAddress, tokenId: this.state.buyTokenId })}</p>
        <BGButton onClick={() => ::this.onBuyItem()}>Buy Item from Marketplace</BGButton>
      </div>
    );
  }

  async onBuyItemWithEther() {
    const { me } = this.props.ctx;
    const { gas, network } = this.props.root;

    const price = parseFloat(this.dom.buyWithEther.price.value, 10);
    const tokenId = parseInt(this.dom.buyWithEther.tokenId.value, 10);
    const itemId = parseInt(this.dom.buyWithEther.itemId.value, 10);
    const contract = this.dom.buyWithEther.gameContract.value;
    const marketPlaceContractAddress = this.dom.buyWithEther.marketPlaceContractAddress.value;

    const item = {
      id: itemId,
      tokenId,
    };

    /* Buy item from Marketplace */
    const res = await buyItemWithEther({
      user: me,
      network,
      item,
      price,
      contract,
      marketPlaceContractAddress,
      gas,
    });
    log.info('Sandbox buyItem: ', res);
  }

  buyItemWithEtherWorkflow() {
    return (
      <div className="web3-sandbox-card">
        <h3>Buy Item from Marketplace (with Ether)</h3>
        <div className="web3-sandbox-card-row">
          <label>gameContract: </label>
          <input ref={c => (this.dom.buyWithEther.gameContract = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>tokenId: </label>
          <input ref={c => (this.dom.buyWithEther.tokenId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>itemId: </label><input ref={c => (this.dom.buyWithEther.itemId = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>price: </label><input ref={c => (this.dom.buyWithEther.price = c)} />
        </div>
        <div className="web3-sandbox-card-row">
          <label>marketPlaceContractAddress: </label><input ref={c => (this.dom.buyWithEther.marketPlaceContractAddress = c)} /> optional
        </div>
        <br />
        <BGButton onClick={() => ::this.onBuyItemWithEther()}>Buy Item from Marketplace (with Ether)</BGButton>
      </div>
    );
  }


  async onExtendItem() {
    const { gas, network } = this.props.root;

    const contract = this.dom.extend.gameContract.value;
    const tokenId = this.dom.extend.tokenId.value;
    const itemId = this.dom.extend.itemId.value;
    const marketPlaceContractAddress = this.dom.extend.marketPlaceContractAddress.value;

    const item = {
      id: itemId,
      tokenId,
    };

    /* Extend item from marketplace */
    const res = await extendItem({
      network,
      contract,
      item,
      marketPlaceContractAddress,
      gas,
    });
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
    const { network } = this.props.root;

    const price = this.dom.fee.price.value;
    const buyer = this.dom.fee.buyer.value;
    const seller = this.dom.fee.seller.value;
    const contract = this.dom.fee.contract.value;
    const currency = this.dom.fee.currency.value;

    /* Get fee from marketplace */
    const res = await getFee({
      network,
      price,
      currency,
      buyer,
      seller,
      contract,
    });
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
          <label>currency: </label><input ref={c => (this.dom.fee.currency = c)} />
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
            margin: 10px;
            background: ${style.colors.background};
            font-size: 12px;
          }
          .key {
            width: calc(30% - 20px);
            float: right;
            margin-left: 20px;
          }
          .workflows {
            width: 70%;
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
          {::this.buyItemWithEtherWorkflow()}
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
