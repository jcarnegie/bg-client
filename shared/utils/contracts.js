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

import {
  ETH2WEI,
  gasOptionsFromGasAndSpeed,
} from '@/shared/utils/txn';


/*
 * dataHexForCurrencyAndPrice
 *
 * - @param {Object} options
 * - - @option: currency - (0|1) ... 0: ETH, 1: PLAT ... ex: 0
 * - - @option: price - ex: 1200
 */
export const dataHexForCurrencyAndPrice = ({ currency, price }) => {
  if (currency === undefined || price === undefined) return null;
  if (currency === null || price === null) return null;
  price = parseFloat(price, 10) * ETH2WEI;
  const currencyInt = parseInt(currency, 10);
  const priceBigNumString = price.toLocaleString('fullwide', { useGrouping: false });
  const listDataBuffer = EthABI.rawEncode(['uint256', 'uint256'], [currencyInt, priceBigNumString]);
  log.trace('dataHexForCurrencyAndPrice price: ', price);
  log.trace('dataHexForCurrencyAndPrice priceBigNumString: ', priceBigNumString);
  log.trace('dataHexForCurrencyAndPrice currency: ', currency);
  return `0x${listDataBuffer.toString('hex')}`;
};


/*
 * dataHexForContractAndTokenId
 *
 * - @param {Object} options
 * - - @option: contract - String
 * - - @option: tokenId - ex: 12
 */
export const dataHexForContractAndTokenId = ({ contract, tokenId }) => {
  if (contract === undefined || tokenId === undefined) return null;
  if (contract === null || tokenId === null) return null;
  const tokenIdInt = parseInt(tokenId, 10);
  const buyDataBuffer = EthABI.rawEncode(['address', 'uint256'], [contract, tokenIdInt]);
  log.trace('dataHexForContractAndTokenId contract: ', contract);
  log.trace('dataHexForContractAndTokenId tokenIdInt: ', tokenIdInt);
  return `0x${buyDataBuffer.toString('hex')}`;
};


/*
 * Experience is too slow to individually estimate for most transactions
 * - Ex:
 */
// gasPrice = await new Promise((resolve, reject) => {
//   GameContract.safeTransferFrom['address,address,uint256,bytes'].estimateGas(
//     userAddress,
//     to,
//     tokenId,
//     dataHex,
//     (err, estGasPrice) => {
//       if (err) {
//         log.error(err);
//         log.error(`Using a default gasPrice: ${DEFAULT_GAS_PRICE}`);
//         return reject(DEFAULT_GAS_PRICE);
//       } else {
//         log.info('Success! gasPrice', estGasPrice);
//         return resolve(estGasPrice);
//       }
//     }
//   )
// });


/*
 * listItem
 *
 * - @param {Object} options
 * - - @option: contract - Game Contract Address
 * - - @option: price - ex: 1200
 * - - @option: currency - (0|1) ... 0: ETH, 1: PLAT ... ex: 0
 * - - @option: to - BGMarketplace Contract Address
 * - - @option: user - [graphql] user object
 * - - @option: item - [graphql] item object
 * - - @option: network - [graphql] network object
 * - - @option: marketPlaceContractAddress - optional
 * - - @option: gas - (optional) [graphql] gas object
 * - - @option: gasSpeed - (optional) String (average|fast|faster)
 */
export const listItem = ({
  contract,
  price,
  currency = 0,
  to,
  user,
  item,
  network = null,
  gas = null,
  gasSpeed = 'fast',
  marketPlaceContractAddress = null,
}) => new Promise(async(resolve, reject) => {
  const userAddress = getWeb3Wallet();

  if (!userAddress) {
    log.info('listItem: user wallet not found.');
    return reject(new Error('User wallet not found. web3 login may be required.'));
  }

  if (!user || !user || !item || !contract || !to || !item.tokenId || !price || !item.id) {
   log.info('listItem: incorrect parameters.');
   return reject(new Error('Incorrect parameters.'));
  }

  const GameContract = getERC721ConformingContract(contract);
  const tokenId = parseInt(item.tokenId, 10);
  const itemId = parseInt(item.id, 10);
  const userId = parseInt(user.id, 10);
  const currencyInt = parseInt(currency, 10);

  const dataHex = dataHexForCurrencyAndPrice({ currency: currencyInt, price });

  const options = { ...gasOptionsFromGasAndSpeed(gas, gasSpeed) };

  if (currencyInt === 1) {
    log.info('listItem: ETH workflow...');
  }

  log.info('userAddress: ', userAddress);
  log.info('contract: ', contract);
  log.info('to: ', to);
  log.info('currencyInt: ', currencyInt);
  log.info('dataHex: ', dataHex);
  log.info('user: ', user);
  log.info('item: ', item);
  log.info('gas: ', gas);
  log.info('gasSpeed: ', gasSpeed);
  log.info('options: ', options);

  /*
   * Deposit item in Marketplace and list
   * - @param: userAddress {address}
   * - @param: marketplaceAddress {address}
   * - @param: tokenId {Int}
   * - @param: dataHex {Bytes (currency {Int}, price {Int})}
   * - @param: options {Object}
   */
  GameContract.safeTransferFrom['address,address,uint256,bytes'](
    userAddress,
    to,
    tokenId,
    dataHex,
    options,
    (err, tx) => {
      if (err) {
        log.error(err);
        return reject(err);
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
          },
        });
        return resolve(tx);
      }
    }
  );
});


/*
 * buyItem
 *
 * - @param {Object} options
 * - - @option: contract - Game Contract Address
 * - - @option: price - ex: 1200
 * - - @option: user - [graphql] user object
 * - - @option: network - [graphql] network object
 * - - @option: item - [graphql] item object
 * - - @option: marketPlaceContractAddress - optional
 * - - @option: gas - (optional) [graphql] gas object
 * - - @option: gasSpeed - (optional) String (average|fast|faster)
 */
export const buyItem = ({
  price,
  contract,
  user,
  network,
  item,
  marketPlaceContractAddress = null,
  gas = null,
  gasSpeed = 'fast',
}) => new Promise((resolve, reject) => {
  if (!user || !item || !network || (!price && price !== 0) || !contract) {
   log.info('buyItem: incorrect parameters.');
   return reject(new Error('Incorrect parameters.'));
  }

  const BitGuildTokenContract = getBitGuildTokenContract(network);
  const marketplaceAddress = marketPlaceContractAddress || getMarketplaceContractAddress(network);
  const tokenIdInt = parseInt(item.tokenId, 10);
  const userId = parseInt(user.id, 10);
  const itemId = parseInt(item.id, 10);
  const priceBigNum = parseFloat(price, 10) * ETH2WEI;

  const dataHex = dataHexForContractAndTokenId({ contract, tokenId: tokenIdInt });

  const options = { ...gasOptionsFromGasAndSpeed(gas, gasSpeed) };

  log.info('BitGuildTokenContract: ', BitGuildTokenContract);
  log.info('marketplaceAddress: ', marketplaceAddress);
  log.info('tokenIdInt: ', tokenIdInt);
  log.info('contract: ', contract);
  log.info('price: ', price);
  log.info('priceBigNum: ', priceBigNum);
  log.info('gas: ', gas);
  log.info('gasSpeed: ', gasSpeed);
  log.info('options: ', options);

  /*
   * Buy item from marketplace
   * - @param: marketplaceContractAddress {address}
   * - @param: price {Int (BigNum)}
   * - @param: dataHex {Bytes (contract {address}, tokenId {Int})}
   * - @param: options {Object}
   */
  BitGuildTokenContract.approveAndCall(
    marketplaceAddress,
    priceBigNum,
    dataHex,
    options,
    (err, tx) => {
      if (err) {
        log.error(err);
        return reject(err);
      } else {
        log.info('Success! Transaction: ', tx);
        client.mutate({
          mutation: mutations.purchaseItem,
          variables: {
            userId,
            itemId,
            salePurchaseTxnHash: tx,
          },
        });
        return resolve(tx);
      }
    }
  );
});


/*
 * buyItemWithEther
 *
 * - @param {Object} options
 * - - @option: contract - Game Contract Address
 * - - @option: price - ex: 1200
 * - - @option: user - [graphql] user object
 * - - @option: network - [graphql] network object
 * - - @option: item - [graphql] item object
 * - - @option: marketPlaceContractAddress - optional
 * - - @option: gas - (optional) [graphql] gas object
 * - - @option: gasSpeed - (optional) String (average|fast|faster)
 */
export const buyItemWithEther = ({
  price,
  contract,
  user,
  network,
  item,
  marketPlaceContractAddress = null,
  gas = null,
  gasSpeed = 'fast',
}) => new Promise((resolve, reject) => {
  if (!user || !item || !network || (!price && price !== 0) || !contract) {
   log.info('buyItemWithEther: incorrect parameters.');
   return reject(new Error('Incorrect parameters.'));
  }

  const marketplaceAddress = marketPlaceContractAddress || getMarketplaceContractAddress(network);
  const MarketplaceContract = getMarketplaceContract(network, marketPlaceContractAddress);
  const tokenIdInt = parseInt(item.tokenId, 10);
  const priceFloat = parseFloat(price, 10);
  const priceWei = window.web3.toWei(priceFloat);
  const userId = parseInt(user.id, 10);
  const itemId = parseInt(item.id, 10);

  const options = {
    from: getWeb3Wallet(),
    value: priceWei,
    ...gasOptionsFromGasAndSpeed(gas, gasSpeed),
  };

  log.info('marketplaceAddress: ', marketplaceAddress);
  log.info('tokenIdInt: ', tokenIdInt);
  log.info('contract: ', contract);
  log.info('price: ', price);
  log.info('priceFloat: ', priceFloat);
  log.info('priceWei: ', priceWei);
  log.info('gas: ', gas);
  log.info('gasSpeed: ', gasSpeed);
  log.info('options: ', options);

  /*
   * Buy item from marketplace
   * - @param: contract {address}
   * - @param: tokenId {int}
   * - @param: options {Object} Shape:
   * - - value: {wei}
   */
  MarketplaceContract.buyWithETH(
    contract,
    tokenIdInt,
    options,
    (err, tx) => {
      if (err) {
        log.info(err);
        return reject(err);
      } else {
        log.info('Success! tx: ', tx);
        client.mutate({
          mutation: mutations.purchaseItem,
          variables: {
            userId,
            itemId,
            salePurchaseTxnHash: tx,
          },
        });
        return resolve(tx);
      }
    }
  );
});


/*
 * extendItem
 *
 * - @param {Object} options
 * - - @option: contract - Game Contract Address
 * - - @option: network - [graphql] network object
 * - - @option: item - [graphql] item object
 * - - @option: marketPlaceContractAddress - optional
 * - - @option: gas - (optional) [graphql] gas object
 * - - @option: gasSpeed - (optional) String (average|fast|faster)
 */
export const extendItem = ({
  contract,
  network,
  item,
  marketPlaceContractAddress = null,
  gas = null,
  gasSpeed = 'fast',
}) => new Promise((resolve, reject) => {
  if (!network || !contract || !item) {
   log.info('extendItem: incorrect parameters.');
   return reject(new Error('Incorrect parameters.'));
  }

  const MarketplaceContract = marketPlaceContractAddress || getMarketplaceContract(network);

  const itemId = parseInt(item.id, 10);
  const tokenId = parseInt(item.tokenId, 10);
  const options = { ...gasOptionsFromGasAndSpeed(gas, gasSpeed) };

  log.info('Extending item listing...');
  log.info('MarketplaceContract: ', MarketplaceContract);
  log.info('contract: ', contract);
  log.info('itemId: ', itemId);
  log.info('tokenId: ', tokenId);
  log.info('gas: ', gas);
  log.info('gasSpeed: ', gasSpeed);
  log.info('options: ', options);

  /*
   * Extend item in marketplace
   * - @param: contract {address}
   * - @param: tokenId {int}
   * - @param: options {Object}
  */
  MarketplaceContract.extendItem(
    contract,
    tokenId,
    options,
    (err, tx) => {
      if (err) {
        log.error(err);
        return reject(err);
      } else {
        log.info('Success! Transaction: ', tx);
        client.mutate({
          mutation: mutations.extendItemForSale,
          variables: {
            itemId,
            saleExtendTxnHash: tx,
          },
        });
        return resolve(tx);
      }
    }
  );
});


/*
 * withdrawItem
 *
 * - @param {Object} options
 * - - @option: contract - Game Contract Address
 * - - @option: network - [graphql] network object
 * - - @option: item - [graphql] item object
 * - - @option: marketPlaceContractAddress - optional
 * - - @option: gas - (optional) [graphql] gas object
 * - - @option: gasSpeed - (optional) String (average|fast|faster)
 */
export const withdrawItem = ({
  contract,
  network,
  item,
  marketPlaceContractAddress = null,
  gas = null,
  gasSpeed = 'average',
}) => new Promise((resolve, reject) => {
  if (!network || !contract || !item) {
   log.info('withdrawItem: incorrect parameters.');
   return reject(new Error('Incorrect parameters.'));
  }

  const MarketplaceContract = marketPlaceContractAddress || getMarketplaceContract(network);

  const itemId = parseInt(item.id, 10);
  const tokenId = parseInt(item.tokenId, 10);
  const options = { ...gasOptionsFromGasAndSpeed(gas, gasSpeed) };

  log.info('Withdrawing item from marketplace ...');
  log.info('MarketplaceContract: ', MarketplaceContract);
  log.info('contract: ', contract);
  log.info('itemId: ', itemId);
  log.info('network: ', network);
  log.info('gas: ', gas);
  log.info('gasSpeed: ', gasSpeed);
  log.info('options: ', options);

  /*
   * Withdraw item from marketplace
   * - @param: contract {address}
   * - @param: tokenId {int}
   * - @param: options {Object}
   */
  MarketplaceContract.withdrawItem(
    contract,
    tokenId,
    options,
    (err, tx) => {
      if (err) {
        log.error(err);
        return reject(err);
      } else {
        log.info('Success! Transaction: ', tx);
        client.mutate({
          mutation: mutations.withdrawItemFromSale,
          variables: {
            itemId,
            saleWithdrawTxnHash: tx,
          },
        });
        return resolve(tx);
      }
    }
  );
});


/*
 * getFee
 *
 * - @param {Object} options
 * - - @option: network - [graphql] network object
 * - - @option: price - Int
 * - - @option: seller - address
 * - - @option: buyer - address
 * - - @option: contract - Game Contract Address
 * - - @option: marketPlaceContractAddress - optional
 */
export const getFee = ({
  network,
  price,
  currency = null,
  buyer = null,
  seller = null,
  contract = null,
  marketPlaceContractAddress = null,
}) => new Promise((resolve, reject) => {
  const zeroAddress = window.web3.toHex(0);

  if (!network || (!price && price !== 0)) reject(new Error('Incorrect parameters.'));

  const MarketplaceContract = marketPlaceContractAddress || getMarketplaceContract(network);

  /* getFee:
   * - @param: price {int}
   * - @param: buyer {address}
   * - @param: seller {address}
   * - @param: contract {address}
   */
  MarketplaceContract.getFee(
    price,
    (currency || zeroAddress),
    (buyer || zeroAddress),
    (seller || zeroAddress),
    (contract || zeroAddress),
    (err, res) => {
      if (err) {
        log.error(err);
        return reject(err);
      } else {
        log.info('Success! Transaction: ', res);
        const feePercentage = res[0].c[0] / 100;
        const fee = res[1].c[0];
        return resolve({ feePercentage, fee });
      }
    }
  );
});

