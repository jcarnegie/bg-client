import * as log from 'loglevel';
import EthABI from 'ethereumjs-abi/index';

import {
  client,
  mutations,
} from '@/shared/utils/apollo';

import {
  getWeb3Wallet,
  getERC721ConformingContract,
  getMarketplaceContract,
  getMarketplaceContractAddress,
  getBitGuildTokenContract,
} from '@/shared/utils/network';


/*
 * dataHexForCurrencyAndPrice
 * - currency - (0|1) ... 0: ETH, 1: PLAT ... ex: 0
 * - price - ex: 1200
 */
export const dataHexForCurrencyAndPrice = ({ currency, price }) => {
  if (currency === undefined || price === undefined) return null;
  if (currency === null || price === null) return null;
  price = parseFloat(price, 10) * 1e18;
  const currencyInt = parseInt(currency, 10);
  const priceBigNumString = price.toLocaleString('fullwide', { useGrouping: false });
  const listDataBuffer = EthABI.rawEncode(['uint256', 'uint256'], [currencyInt, priceBigNumString]);
  log.info('dataHexForCurrencyAndPrice price: ', price);
  log.info('dataHexForCurrencyAndPrice priceBigNumString: ', priceBigNumString);
  log.info('dataHexForCurrencyAndPrice currency: ', currency);
  return `0x${listDataBuffer.toString('hex')}`;
}


/*
 * dataHexForContractAndTokenId
 * - contract - String
 * - tokenId - ex: 12
 */
export const dataHexForContractAndTokenId = ({ contract, tokenId }) => {
  if (contract === undefined || tokenId === undefined) return null;
  if (contract === null || tokenId === null) return null;
  const tokenIdInt = parseInt(tokenId, 10);
  const buyDataBuffer = EthABI.rawEncode(['address', 'uint256'], [contract, tokenIdInt]);
  log.info('dataHexBuy contract: ', contract);
  log.info('dataHexBuy tokenIdInt: ', tokenIdInt);
  return `0x${buyDataBuffer.toString('hex')}`;
}


/*
 * listItem
 * - contract - Game Contract Address
 * - price - ex: 1200
 * - currency - (0|1) ... 0: ETH, 1: PLAT ... ex: 0
 * - to - BGMarketplace Contract Address
 * - user - [redux] user object
 * - item - [redux] item object
 */
export const listItem = ({
  contract,
  price,
  currency = 0,
  to,
  user,
  item,
}) => new Promise((resolve, reject) => {
  const userAddress = getWeb3Wallet();

  if (!userAddress) {
    log.info('listItem: user wallet not found.');
    return reject();
  }

  if (!user || !user.data || !item || !contract || !to || !item.tokenId || !price || !item.id) {
   log.info('listItem: incorrect parameters.')
   return reject();
  }

  const GameContract = getERC721ConformingContract(contract);
  const tokenId = parseInt(item.tokenId, 10);
  const itemId = parseInt(item.id, 10);
  const userId = parseInt(user.data.id, 10);
  const currencyInt = parseInt(currency, 10);

  const dataHex = dataHexForCurrencyAndPrice({ currency: currencyInt, price });

  if (currencyInt === 1) {
    log.info('listItem: ETH workflow not implemented.');
    return reject(); // do other stuff for ETH
  }

  log.info('userAddress: ', userAddress);
  log.info('contract: ', contract);
  log.info('to: ', to);
  log.info('item.tokenId: ', item.tokenId);
  log.info('currencyInt: ', currencyInt);
  log.info('dataHex: ', dataHex);
  log.info('user: ', user);
  log.info('item: ', item);

  /* Create item listing */
  GameContract.safeTransferFrom['address,address,uint256,bytes'](
    userAddress,
    to,
    tokenId,
    dataHex,
    (err, tx) => {
      if (err) {
        log.error(err);
        return resolve(err);
      } else {
        log.info('Success! Transaction: ', tx);
        client.mutate({
          mutation: mutations.listItemForSale,
          variables: {
            userId,
            itemId,
            saleListingId: 0, // Not used anymore
            saleTxnHash: tx,
            salePrice: price,
          }
        });
        return resolve(tx);
      }
    }
  );
});


/*
 * buyItem
 * - contract - Game Contract Address
 * - price - ex: 1200
 * - user - [redux] user object
 * - network - [redux] network object
 * - item - [redux] item object
 * - bitGuildTokenContractAddress - optional
 * - marketPlaceContractAddress - optional
 */
export const buyItem = ({
  price,
  contract,
  user,
  network,
  item,
  bitGuildTokenContractAddress = null,
  marketPlaceContractAddress = null,
}) => new Promise((resolve, reject) => {
  if (!user || !item || !network || (!price && price !== 0) || !contract) {
   log.info('buyItem: incorrect parameters.')
   return reject();
  }

  const BitGuildTokenContract = bitGuildTokenContractAddress || getBitGuildTokenContract(network);
  const marketplaceAddress = marketPlaceContractAddress || getMarketplaceContractAddress(network);
  const tokenIdInt = parseInt(item.tokenId, 10);
  const userId = parseInt(user.data.id, 10);
  const itemId = parseInt(item.id, 10);
  const priceBigNum = parseFloat(price, 10) * 1e18;

  const dataHex = dataHexForContractAndTokenId({ contract, tokenId: tokenIdInt });

  log.info('BitGuildTokenContract: ', BitGuildTokenContract);
  log.info('marketplaceAddress: ', marketplaceAddress);
  log.info('tokenIdInt: ', tokenIdInt);
  log.info('contract: ', contract);
  log.info('price: ', price);
  log.info('priceBigNum: ', priceBigNum);
  log.info('dataHex: ', dataHex);

  /* Buy item from marketplace */
  BitGuildTokenContract.approveAndCall(
    marketplaceAddress,
    priceBigNum,
    dataHex,
    (err, tx) => {
      if (err) {
        log.error(err);
        return resolve(err);
      } else {
        log.info('Success! Transaction: ', tx);
        client.mutate({
          mutation: mutations.purchaseItem,
          variables: {
            userId,
            itemId,
            salePurchaseTxnHash: tx,
          }
        });
        return resolve(tx);
      }
    }
  );
});


/*
 * extendItem
 * - contract - Game Contract Address
 * - network - [redux] network object
 * - item - [redux] item object
 * - marketPlaceContractAddress - optional
 */
export const extendItem = ({
  contract,
  network,
  item,
  marketPlaceContractAddress = null,
}) => new Promise((resolve, reject) => {
  if (!network || !contract || !item) {
   log.info('extendItem: incorrect parameters.')
   return reject();
  }

  const MarketplaceContract = marketPlaceContractAddress || getMarketplaceContract(network);

  const itemId = parseInt(item.id, 10);
  const tokenId = parseInt(item.tokenId, 10);

  log.info('Extending item listing...');
  log.info('MarketplaceContract: ', MarketplaceContract);
  log.info('contract: ', contract);
  log.info('itemId: ', itemId);
  log.info('tokenId: ', tokenId);
  log.info('network: ', network);

  /* Extend item from marketplace */
  MarketplaceContract.extendItem(
    contract,
    tokenId,
    (err, tx) => {
      if (err) {
        log.error(err);
        return resolve(err);
      } else {
        log.info('Success! Transaction: ', tx);
        client.mutate({
          mutation: mutations.extendItemForSale,
          variables: {
            itemId,
            saleExtendTxnHash: tx,
          }
        });
        return resolve(tx);
      }
    }
  );
});


/*
 * withdrawItem
 * - contract - Game Contract Address
 * - network - [redux] network object
 * - item - [redux] item object
 * - marketPlaceContractAddress - optional
 */
export const withdrawItem = ({
  contract,
  network,
  item,
  marketPlaceContractAddress = null,
}) => new Promise((resolve, reject) => {
  if (!network || !contract || !item) {
   log.info('withdrawItem: incorrect parameters.')
   return reject();
  }

  const MarketplaceContract = marketPlaceContractAddress || getMarketplaceContract(network);

  const itemId = parseInt(item.id, 10);
  const tokenId = parseInt(item.tokenId, 10);

  log.info('Withdrawing item from marketplace ...');
  log.info('MarketplaceContract: ', MarketplaceContract);
  log.info('contract: ', contract);
  log.info('itemId: ', itemId);
  log.info('network: ', network); 

  /* Extend item from marketplace */
  MarketplaceContract.withdrawItem(
    contract,
    tokenId,
    (err, tx) => {
      if (err) {
        log.error(err);
        return resolve(err);
      } else {
        log.info('Success! Transaction: ', tx);
        client.mutate({
          mutation: mutations.withdrawItemFromSale,
          variables: {
            itemId,
            saleWithdrawTxnHash: tx,
          }
        }); 
        return resolve(tx);
      }
    }
  );
});


/*
 * getFee
 * - network - [redux] network object
 * - price - Int
 * - seller - address
 * - buyer - address
 * - contract - Game Contract Address
 * - marketPlaceContractAddress - optional
 */
export const getFee = ({
  network,
  price,
  buyer = null,
  seller = null,
  contract = null,
  marketPlaceContractAddress = null,
}) => new Promise((resolve, reject) => {

  const zeroAddress = window.web3.toHex(0);

  if (!network || (!price && price !== 0)) reject();

  const MarketplaceContract = marketPlaceContractAddress || getMarketplaceContract(network);


  /* params: price, buyer, seller, contract */
  MarketplaceContract.getFee['uint256,address,address,address'](
    price,
    (buyer || zeroAddress),
    (seller || zeroAddress),
    (contract || zeroAddress),
    (err, res) => {
      if (err) {
        log.error(err);
        return resolve(err);
      } else {
        log.info('Success! Transaction: ', res);
        const feePercentage = res[0].c[0] / 100;
        const fee = res[1].c[0];
        return resolve({feePercentage, fee});
      }
    }
  );
});

