import topupABI from "@/shared/contracts/topup";
import tokenABI from "@/shared/contracts/token";
import oracleABI from "@/shared/contracts/oracle";
import bitizensIGOABI from "@/shared/contracts/bitizensIGOABI";


export const networkIdToNameMap = {
  "1": "main",
  "2": "kovan",
  "3": "ropsten",
  "4": "rinkeby",
};

export const networkAddressMap = {
  main: {
    token: process.env.MAINNET_TOKEN_CONTRACT_ADDR,
    topup: process.env.MAINNET_TOPUP_CONTRACT_ADDR,
    oracle: process.env.MAINNET_ORACLE_CONTRACT_ADDR,
    bitizensIGO: process.env.MAINNET_BITIZENS_IGO_CONTRACT_ADDR,
  },
  rinkeby: {
    token: process.env.RINKEBY_TOKEN_CONTRACT_ADDR,
    topup: process.env.RINKEBY_TOPUP_CONTRACT_ADDR,
    oracle: process.env.RINKEBY_ORACLE_CONTRACT_ADDR,
    bitizensIGO: process.env.RINKEBY_BITIZENS_IGO_CONTRACT_ADDR,
  },
};

export function networkIdToName(id) {
  return networkIdToNameMap[id];
}

export function networkIsSupported(network) {
  if (!network.data) return false;
  return Object.keys(networkAddressMap).includes(network.data.name);
}

export function networkIdIsSupported(networkId) {
  if (!networkId) return false;
  return Object.keys(networkAddressMap).includes(networkIdToName(networkId));
}

export function web3IsInstalled() {
  return (typeof window !== "undefined" && window.hasOwnProperty("web3"));
}

export function getWeb3Wallet() {
  return web3IsInstalled() ? (window.web3.eth.accounts && window.web3.eth.accounts[0]) : null;
}

export function getOracleContractAddress(network) {
  return networkAddressMap[network.data.name].oracle;
}

export function getTokenContractAddress(network) {
  return networkAddressMap[network.data.name].token;
}

export function getTopupContractAddress(network) {
  return networkAddressMap[network.data.name].topup;
}

export function getBitizensIGOContractAddress(network) {
  return networkAddressMap[network.data.name].bitizensIGO;
}

export function getTopupContract(network) {
  return window.web3.eth.contract(topupABI).at(getTopupContractAddress(network));
}

export function getTokenContract(network) {
  return window.web3.eth.contract(tokenABI).at(getTokenContractAddress(network));
}

export function getOracleContract(network) {
  return window.web3.eth.contract(oracleABI).at(getOracleContractAddress(network));
}

export function getBitizensIGOContract(network) {
  return window.web3.eth.contract(bitizensIGOABI).at(getBitizensIGOContractAddress(network));
}
