import * as log from 'loglevel';

import {
  getWeb3Wallet,
  getERC721ConformingContract,
} from '@/shared/utils/network';


/*
 * listItem
 * - from - Game Contract Address
 * - to - BGMarketplace Contract Address
 * - price - ex: 1200 PLAT
 * - currency - (0|1) ... 0: ETH, 1: PLAT ... ex: 0
 * - callback => callback(err, tx)
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

  if (!from || !to || !tokenId || !price || !currency) {
   log.info('listItem: incorrect parameters.')
   return reject();
  }

  const GameContract = getERC721ConformingContract(from);

  const priceBigNum = parseInt(price, 10) * 1e18;;
  const currencyInt = parseInt(currency, 10);
  const dataBuffer = EthABI.rawEncode(['uint256', 'uint256'], [currencyInt, priceBigNum.toString()]);
  const dataHex = `0x${dataBuffer.toString('hex')}`;

  if (currencyInt == 1) {
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
