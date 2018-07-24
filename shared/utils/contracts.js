import * as log from 'loglevel';

import {
  getWeb3Wallet,
  getERC721ConformingContract,
  getMarketplaceContract,
  getMarketplaceContractAddress,
  getBitGuildTokenContract,
} from '@/shared/utils/network';


/*
 * listItem
 * - from - Game Contract Address
 * - to - BGMarketplace Contract Address
 * - price - ex: 1200
 * - currency - (0|1) ... 0: ETH, 1: PLAT ... ex: 0
 */
export const listItem = ({
  from,
  to,
  tokenId,
  price,
  currency = 0,
}) => new Promise((resolve, reject) => {
  const userAddress = getWeb3Wallet();

  if (!userAddress) {
    log.info('listItem: user wallet not found.');
    return reject();
  }

  if (!from || !to || !tokenId || !price) {
   log.info('listItem: incorrect parameters.')
   return reject();
  }

  const GameContract = getERC721ConformingContract(from);

  const priceBigNum = parseInt(price, 10) * 1e18;;
  const currencyInt = parseInt(currency, 10);
  const dataBuffer = EthABI.rawEncode(['uint256', 'uint256'], [currencyInt, priceBigNum.toString()]);
  const dataHex = `0x${dataBuffer.toString('hex')}`;

  if (currencyInt === 1) {
    log.info('listItem: ETH workflow not implemented.');
    return reject(); // do other stuff for ETH
  }

  log.info('userAddress: ', userAddress);
  log.info('from: ', from);
  log.info('to: ', to);
  log.info('tokenId: ', tokenId);
  log.info('priceBigNum: ', priceBigNum);
  log.info('currencyInt: ', currencyInt);
  log.info('dataBuffer: ', dataBuffer);
  log.info('dataHex: ', dataHex);

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
        return resolve(tx);
      }
    }
  );
});


/*
 * buyItem
 * - network - [redux] network object
 * - contract - Game Contract Address
 * - price - ex: 1200
 * - tokenId - ex: 12
 */
export const buyItem = ({
  network,
  price,
  tokenId,
  contract,
}) => new Promise((resolve, reject) => {
  if (!network || !price || !tokenId || !contract) {
   log.info('buyItem: incorrect parameters.')
   return reject();
  }

  const BitGuildTokenContract = getBitGuildTokenContract(network);
  const marketplaceAddress = getMarketplaceContractAddress(network);
  const tokenIdInt = parseInt(tokenId, 10);
  const priceBigNum = parseInt(price, 10) * 1e18;;
  const dataBuffer = EthABI.rawEncode(['address', 'uint256'], [contract, tokenIdInt]);
  const dataHex = `0x${dataBuffer.toString('hex')}`;

  log.info('BitGuildTokenContract: ', BitGuildTokenContract);
  log.info('marketplaceAddress: ', marketplaceAddress);
  log.info('tokenIdInt: ', tokenIdInt);
  log.info('priceBigNum: ', priceBigNum);
  log.info('dataBuffer: ', dataBuffer);
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
        return resolve(tx);
      }
    }
  );
});


/*
 * extendItem
 * - network - [redux] network object
 * - from - Game Contract Address
 * - tokenId - Item tokenId
 */
export const extendItem = ({
  network,
  contract,
  tokenId,
}) => new Promise((resolve, reject) => {
  if (!network || !contract || !tokenId) {
   log.info('extendItem: incorrect parameters.')
   return reject();
  }

  const MarketplaceContract = getMarketplaceContract(network);

  log.info('Extending item listing...');
  log.info('MarketplaceContract: ', MarketplaceContract);
  log.info('contract: ', contract);
  log.info('tokenId: ', tokenId);
  log.info('network: ', network);

  /* Extend item from marketplace */
  MarketplaceContract.extendItem(
    contract,
    tokenId,
    (err, res) => {
      if (err) {
        log.error(err);
        return resolve(err);
      } else {
        log.info('Success! Transaction: ', tx);
        return resolve(tx);
      }
    }
  );
});


/*
 * withdrawItem
 * - network - [redux] network object
 * - from - Game Contract Address
 * - tokenId - Item tokenId
 */
export const withdrawItem = ({
  network,
  contract,
  tokenId,
}) => new Promise((resolve, reject) => {
  if (!network || !contract || !tokenId) {
   log.info('withdrawItem: incorrect parameters.')
   return reject();
  }

  const MarketplaceContract = getMarketplaceContract(network);

  log.info('Extending item listing...');
  log.info('MarketplaceContract: ', MarketplaceContract);
  log.info('contract: ', contract);
  log.info('tokenId: ', tokenId);
  log.info('network: ', network);

  /* Extend item from marketplace */
  MarketplaceContract.withdrawItem(
    contract,
    tokenId,
    (err, res) => {
      if (err) {
        log.error(err);
        return resolve(err);
      } else {
        log.info('Success! Transaction: ', tx);
        return resolve(tx);
      }
    }
  );
});
