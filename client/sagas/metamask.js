import bluebird from "bluebird";
import {put, select, takeEvery} from "redux-saga/effects";
import tokenABI from "../../shared/contracts/token";
import oracleABI from "../../shared/contracts/oracle";
import networkConfig from "../utils/network";
import {
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
  USER_CHANGED
} from "../../shared/constants/actions";


function * getRate() {
  try {
    yield put({
      type: RATE_LOADING
    });
    const network = yield select(state => state.network);
    const contract = window.web3.eth.contract(oracleABI).at(networkConfig[network.data.id].oracle);
    const ETHPrice = yield bluebird.promisify(contract.ETHPrice)();
    yield put({
      type: RATE_CHANGED,
      payload: ETHPrice.toNumber() / 1e18
    });
  } catch (error) {
    yield put({
      type: RATE_ERROR
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error
    });
  }
}

function * getBalanceETH() {
  const user = yield select(state => state.user);
  if (!user.isLoading && user.success) {
    try {
      yield put({
        type: BALANCE_ETH_LOADING
      });
      const balance = yield bluebird.promisify(window.web3.eth.getBalance)(user.data.wallet);
      yield put({
        type: BALANCE_ETH_CHANGED,
        payload: window.web3.fromWei(balance, "ether").toNumber()
      });
    } catch (error) {
      yield put({
        type: BALANCE_ETH_ERROR
      });
      yield put({
        type: MESSAGE_ADD,
        payload: error
      });
    }
  }
}

function * getBalancePLAT() {
  const user = yield select(state => state.user);
  if (!user.isLoading && user.success) {
    try {
      yield put({
        type: BALANCE_PLAT_LOADING
      });
      const network = yield select(state => state.network);
      const contract = window.web3.eth.contract(tokenABI).at(networkConfig[network.data.id].token);
      const balance = yield bluebird.promisify(contract.balanceOf)(user.data.wallet);
      yield put({
        type: BALANCE_PLAT_CHANGED,
        payload: window.web3.fromWei(balance, "ether").toNumber()
      });
    } catch (error) {
      yield put({
        type: BALANCE_PLAT_ERROR
      });
      yield put({
        type: MESSAGE_ADD,
        payload: error
      });
    }
  }
}

function * getNetwork() {
  try {
    yield put({
      type: NETWORK_LOADING
    });
    const netId = yield bluebird.promisify(window.web3.version.getNetwork)();
    yield put({
      type: NETWORK_CHANGED,
      payload: {
        id: netId
      }
    });
  } catch (error) {
    yield put({
      type: MESSAGE_ADD,
      payload: error
    });
  }
}


export default function * metaMaskSaga() {
  yield takeEvery(ACCOUNT_CHANGED, getNetwork);
  yield takeEvery(USER_CHANGED, getBalanceETH);
  yield takeEvery(NEW_BLOCK, getBalanceETH);
  yield takeEvery(USER_CHANGED, getBalancePLAT);
  yield takeEvery(NEW_BLOCK, getBalancePLAT);
  yield takeEvery(NETWORK_CHANGED, getRate);
}

