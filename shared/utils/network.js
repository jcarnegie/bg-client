import bluebird from 'bluebird';
import * as log from 'loglevel';

import topupABI from '@/shared/contracts/BGTopup/abi.json';
import bitGuildTokenABI from '@/shared/contracts/BGToken/abi.json';
import oracleABI from '@/shared/contracts/BGOracle/abi.json';
import ERC721ABI from '@/shared/contracts/ERC721/abi.json';
import marketplaceABI from '@/shared/contracts/BGMarketplace/abi.json';
import bitizensIGOABI from '@/shared/contracts/BitizensIGO/abi.json';


export const networkIdToNameMap = {
  '1': 'main',
  '42': 'kovan', /* Not a typo, MetaMask resolves the Kovan id to '42' */
  '3': 'ropsten',
  '4': 'rinkeby',
};

export const networkAddressMap = {
  main: {
    token: process.env.MAINNET_TOKEN_CONTRACT_ADDR,
    topup: process.env.MAINNET_TOPUP_CONTRACT_ADDR,
    oracle: process.env.MAINNET_ORACLE_CONTRACT_ADDR,
    marketplace: process.env.MAINNET_MARKETPLACE_CONTRACT_ADDR,
    bitizensIGO: process.env.MAINNET_BITIZENS_IGO_CONTRACT_ADDR,
  },
  rinkeby: {
    token: process.env.RINKEBY_TOKEN_CONTRACT_ADDR,
    topup: process.env.RINKEBY_TOPUP_CONTRACT_ADDR,
    oracle: process.env.RINKEBY_ORACLE_CONTRACT_ADDR,
    marketplace: process.env.RINKEBY_MARKETPLACE_CONTRACT_ADDR,
    bitizensIGO: process.env.RINKEBY_BITIZENS_IGO_CONTRACT_ADDR,
  },
};

export function asyncGetNetworkId() {
  return bluebird.promisify(window.web3.version.getNetwork)();
}

export function networkIdToName(id) {
  return networkIdToNameMap[id];
}

export function networkIsSupported(network) {
  if (!network || !network.data) return false;
  return Object.keys(networkAddressMap).includes(network.data.name);
}

export function networkIdIsSupported(networkId) {
  if (!networkId) return false;
  return Object.keys(networkAddressMap).includes(networkIdToName(networkId));
}

export function getContractFromGame(game, network) {
  if (!game || !network.data) return false;
  return game.nft[network.data.id];
}

export function web3IsInstalled() {
  return (typeof window !== 'undefined' && window.hasOwnProperty('web3'));
}

export function getWeb3Wallet() {
  return web3IsInstalled() ? (window.web3.eth.accounts && window.web3.eth.accounts[0]) : null;
}

export function getOracleContractAddress(network) {
  if (!networkIsSupported(network)) {
    log.warn('Network is not supported. network: ', network);
    return null;
  }
  return networkAddressMap[network.data.name].oracle;
}

export function getBitGuildTokenContractAddress(network) {
  if (!networkIsSupported(network)) {
    log.warn('Network is not supported. network: ', network);
    return null;
  }
  return networkAddressMap[network.data.name].token;
}

export function getMarketplaceContractAddress(network) {
  if (!networkIsSupported(network)) {
    log.warn('Network is not supported. network: ', network);
    return null;
  }
  return networkAddressMap[network.data.name].marketplace;
}

export function getTopupContractAddress(network) {
  if (!networkIsSupported(network)) {
    log.warn('Network is not supported. network: ', network);
    return null;
  }
  return networkAddressMap[network.data.name].topup;
}

export function getBitizensIGOContractAddress(network) {
  if (!networkIsSupported(network)) {
    log.warn('Network is not supported. network: ', network);
    return null;
  }
  return networkAddressMap[network.data.name].bitizensIGO;
}

export function getTopupContract(network) {
  return window.web3.eth.contract(topupABI).at(getTopupContractAddress(network));
}

export function getBitGuildTokenContract(network) {
  return window.web3.eth.contract(bitGuildTokenABI).at(getBitGuildTokenContractAddress(network));
}

export function getOracleContract(network) {
  return window.web3.eth.contract(oracleABI).at(getOracleContractAddress(network));
}

export function getMarketplaceContract(network, address = null) {
  return window.web3.eth.contract(marketplaceABI).at(address || getMarketplaceContractAddress(network));
}

export function getBitizensIGOContract(network) {
  return window.web3.eth.contract(bitizensIGOABI).at(getBitizensIGOContractAddress(network));
}

export function getERC721ConformingContract(contractAddress) {
  return window.web3.eth.contract(ERC721ABI).at(contractAddress);
}
