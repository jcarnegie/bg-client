import * as log from 'loglevel';
import bluebird from 'bluebird';
import {
  web3IsInstalled,
  networkIsSupported,
  getOracleContract,
  getBitGuildTokenContract,
} from '@/shared/utils/network';
import { localQueries } from './index';
import { typeDefs } from './typedefs';

export const clientState = {
  defaults: {
    wallet: null,
    rate: null,
    gifts: [],
    balanceETH: 0,
    balancePLAT: 0,
    latestBlock: '',
    validationMessages: [],
    showUserRegistrationWorkflow: false,
    network: {
      id: null,
      name: null,
      supported: null,
      available: null,
      __typename: 'Network',
    },
    gas: {
      average: 8,
      fast: 16,
      fastest: 30,
      __typename: 'Gas',
    },
  },
  resolvers: {
    Mutation: {
      updateLatestBlock: async(_, { tx }, { cache, getCacheKey }) => {
        if (!web3IsInstalled()) return null;
        await cache.writeData({ data: { latestBlock: tx } });
        const { gifts } = await cache.readQuery({ query: localQueries.gifts });
        const result = await Promise.all(gifts.map(gift =>
          // will return null while transaction is in process
          bluebird.promisify(window.web3.eth.getTransactionReceipt)(gift.tx)
        ));
        const hashes = result.filter(tx => tx).map(tx => tx.transactionHash);
        cache.writeData({
          data: {
            gifts: gifts.filter(gift => !hashes.includes(gift.tx)),
          },
        });
        return null;
      },
      updateUserBalances: async(_, $, { cache, getCacheKey }) => {
        const { network, wallet } = await cache.readQuery({ query: localQueries.root });
        console.log('updateUserBalances data: ', network, wallet);
        if (!network || !wallet) return null;
        let balanceETH = 0;
        let balancePLAT = 0;
        const balanceResponseETH = await bluebird.promisify(window.web3.eth.getBalance)(wallet);
        balanceETH = window.web3.fromWei(balanceResponseETH, 'ether').toNumber();
        const balanceResponsePLAT = await bluebird.promisify(getBitGuildTokenContract(network).balanceOf)(wallet);
        balancePLAT = window.web3.fromWei(balanceResponsePLAT, 'ether').toNumber();
        await cache.writeData({ data: { balanceETH, balancePLAT } });
      },
      updateWallet: async(_, { wallet }, { cache, getCacheKey }) => {
        console.log('updateWallet wallet: ', wallet);
        if (!wallet) return null;
        log.info(`Setting wallet to ${wallet}.`);
        await cache.writeData({ data: { wallet } });
        return null;
      },
      updateNetwork: async(_, { ...network }, { cache, getCacheKey }) => {
        console.log('updateNetwork network: ', network);
        log.info(`Setting network to ${network.name} with id ${network.id}.`);
        let data = {
          network: {
            ...network,
            __typename: 'Network',
          },
        };

        await cache.writeData({ data });

        // const gasStationResponse = await fetch(ETH_GAS_STATION_ENDPOINT).then(res => res.json());
        // log.info(`Fetched gas from ${ETH_GAS_STATION_ENDPOINT}`);
        // await cache.writeData({
        //   data: {
        //     gas: {
        //       average: toGwei(gasStationResponse.average),
        //       fast: toGwei(gasStationResponse.fast),
        //       fastest: toGwei(gasStationResponse.fastest),
        //       __typename: 'Gas',
        //     },
        //   },
        // });

        log.info(`Fetched rate from oracle contract on ${name} network.`);
        const ETHPrice = await bluebird.promisify(getOracleContract(network).ETHPrice)();
        const rate = window.web3.fromWei(ETHPrice, 'ether').toNumber();
        await cache.writeData({ data: { rate } });
        log.info(`Set rate to ${rate.toString()}.`);
        return null;
      },
      toggleUserRegistrationWorkflow: async(_, { on = null }, { cache, getCacheKey }) => {
        if (typeof on === 'boolean') {
          await cache.writeData({ data: { showUserRegistrationWorkflow: Boolean(on) } });
          return on;
        } else {
          const { showUserRegistrationWorkflow } = await cache.readQuery({ query: localQueries.root });
          await cache.writeData({ data: { showUserRegistrationWorkflow: !showUserRegistrationWorkflow } });
          return !showUserRegistrationWorkflow;
        }
      },
      validationAddAll: async(_, { validationMessages }, { cache, getCacheKey }) => {
        const data = await cache.readQuery({ query: localQueries.root });
        const allMsgs = data.validationMessages.concat(validationMessages);
        await cache.writeData({ data: { validationMessages: allMsgs } });
        return null;
      },
      removeValidation: async(_, { name }, { cache, getCacheKey }) => {
        const data = await cache.readQuery({ query: localQueries.root });
        const validationMessages = data.validationMessages.filter(msg => (msg.name !== name));
        await cache.writeData({ data: { validationMessages } });
        return null;
      },
      removeAllValidations: async(_, variables, { cache }) => {
        await cache.writeData({ data: { validationMessages: [] } });
        return null;
      },
    },
  },
  typeDefs,
};