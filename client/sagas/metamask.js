import bluebird from "bluebird";
import {put, select, takeEvery} from "redux-saga/effects";
import tokenABI from "@/shared/contracts/token";
import oracleABI from "@/shared/contracts/oracle";
import networkConfig from "@/client/utils/network";
import {
  APP_INIT,
  ACCOUNT_CHANGED,
  BALANCE_ETH_CHANGED,
  BALANCE_ETH_ERROR,
  BALANCE_ETH_LOADING,
  BALANCE_PLAT_CHANGED,
  BALANCE_PLAT_ERROR,
  BALANCE_PLAT_LOADING,
  MESSAGE_ADD,
  NETWORK_CHANGED,
  NETWORK_LOADING,
  NEW_BLOCK,
  RATE_CHANGED,
  RATE_ERROR,
  RATE_LOADING,
  RATE_REQUEST,
} from "@/shared/constants/actions";


// TODO - consolidate shared balance fetching logic

function * getRate() {
  try {
    const network = yield select(state => state.network);
    if (Object.keys(networkConfig).includes(network.data.id)) {
      yield put({
        type: RATE_LOADING,
      });
      const contract = window.web3.eth.contract(oracleABI).at(networkConfig[network.data.id].oracle);
      const ETHPrice = yield bluebird.promisify(contract.ETHPrice)();
      yield put({
        type: RATE_CHANGED,
        payload: window.web3.fromWei(ETHPrice, "ether").toNumber(),
      });
    }
  } catch (error) {
    yield put({
      type: RATE_ERROR,
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error,
    });
  }
}

function * getBalanceETH() {
  const account = yield select(state => state.account);
  if (!account.isLoading && account.success) {
    try {
      const network = yield select(state => state.network);
      const supportedNetwork = network.data && Object.keys(networkConfig).includes(network.data.id);
      yield put({type: BALANCE_ETH_LOADING});
      if (supportedNetwork) {
        const balance = yield bluebird.promisify(window.web3.eth.getBalance)(account.wallet);
        yield put({
          type: BALANCE_ETH_CHANGED,
          payload: window.web3.fromWei(balance, "ether").toNumber(),
        });
      }
    } catch (error) {
      yield put({
        type: BALANCE_ETH_ERROR,
      });
      yield put({
        type: MESSAGE_ADD,
        payload: error,
      });
    }
  }
}

function * getBalancePLAT() {
  const account = yield select(state => state.account);
  if (!account.isLoading && account.success) {
    try {
      const network = yield select(state => state.network);
      const supportedNetwork = network.data && Object.keys(networkConfig).includes(network.data.id);
      yield put({type: BALANCE_PLAT_LOADING});
      if (supportedNetwork) {
        const contract = window.web3.eth.contract(tokenABI).at(networkConfig[network.data.id].token);
        const balance = yield bluebird.promisify(contract.balanceOf)(account.wallet);
        yield put({
          type: BALANCE_PLAT_CHANGED,
          payload: window.web3.fromWei(balance, "ether").toNumber(),
        });
      }
    } catch (error) {
      yield put({
        type: BALANCE_PLAT_ERROR,
      });
      yield put({
        type: MESSAGE_ADD,
        payload: error,
      });
    }
  }
}

function * getNetwork() {
  try {
    if (typeof window.web3 === "undefined" || !window.web3) return;
    yield put({
      type: NETWORK_LOADING,
    });
    const netId = yield bluebird.promisify(window.web3.version.getNetwork)();
    yield put({
      type: NETWORK_CHANGED,
      payload: {
        id: netId,
      },
    });
    yield put({
      type: RATE_REQUEST,
    });
  } catch (error) {
    yield put({
      type: MESSAGE_ADD,
      payload: error,
    });
  }
}


export default function * metaMaskSaga() {
  yield takeEvery(APP_INIT, getNetwork);
  yield takeEvery(ACCOUNT_CHANGED, getNetwork);
  yield takeEvery(ACCOUNT_CHANGED, getBalancePLAT);
  yield takeEvery(ACCOUNT_CHANGED, getBalanceETH);
  yield takeEvery(NEW_BLOCK, getBalanceETH);
  yield takeEvery(NEW_BLOCK, getBalancePLAT);
  yield takeEvery(RATE_REQUEST, getRate);
}

