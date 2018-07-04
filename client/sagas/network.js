import bluebird from "bluebird";
import * as log from "loglevel";
import {eventChannel} from "redux-saga";
import {call, take, put, select, takeLatest} from "redux-saga/effects";

import {
  networkIsSupported,
  getOracleContract,
  getTokenContract,
} from "@/shared/utils/network";

import {
  NETWORK_GET,
  NETWORK_GET_BALANCE_ETH,
  NETWORK_GET_BALANCE_PLAT,
  BALANCE_ETH_CHANGED,
  BALANCE_ETH_ERROR,
  BALANCE_ETH_LOADING,
  BALANCE_PLAT_CHANGED,
  BALANCE_PLAT_ERROR,
  BALANCE_PLAT_LOADING,
  ACCOUNT_LOGGED_IN,
  ACCOUNT_LOGGED_OUT,
  NETWORK_BEGIN_LISTENING,
  NETWORK_CHANGED,
  NETWORK_CHECK_AVAILABILITY,
  NETWORK_AVAILABLE,
  NETWORK_LOADING,
  NETWORK_NEW_BLOCK,
  RATE_CHANGED,
  RATE_ERROR,
  RATE_LOADING,
  RATE_REQUEST,
} from "@/shared/constants/actions";


function * getRate() {
  try {
    const network = yield select(state => state.network);
    if (networkIsSupported(network)) {
      yield put({type: RATE_LOADING});
      const ETHPrice = yield bluebird.promisify(getOracleContract(network).ETHPrice)();
      yield put({
        type: RATE_CHANGED,
        payload: window.web3.fromWei(ETHPrice, "ether").toNumber(),
      });
    }
  } catch (error) {
    yield put({type: RATE_ERROR});
  }
}

function * getBalanceETH() {
  try {
    const account = yield select(state => state.account);
    const network = yield select(state => state.network);
    yield put({type: BALANCE_ETH_LOADING});
    if (networkIsSupported(network)) {
      const balance = yield bluebird.promisify(window.web3.eth.getBalance)(account.wallet);
      yield put({
        type: BALANCE_ETH_CHANGED,
        payload: window.web3.fromWei(balance, "ether").toNumber(),
      });
    }
  } catch (error) {
    yield put({type: BALANCE_ETH_ERROR});
  }
}

function * getBalancePLAT() {
  try {
    const account = yield select(state => state.account);
    const network = yield select(state => state.network);
    yield put({type: BALANCE_PLAT_LOADING});
    if (networkIsSupported(network)) {
      const balance = yield bluebird.promisify(getTokenContract(network).balanceOf)(account.wallet);
      yield put({
        type: BALANCE_PLAT_CHANGED,
        payload: window.web3.fromWei(balance, "ether").toNumber(),
      });
    }
  } catch (error) {
    yield put({type: BALANCE_PLAT_ERROR});
  }
}


function * checkNetworkAvailability() {
  try {
    const web3IsAvailable = typeof window !== "undefined" && window.web3;
    yield put({
      type: NETWORK_AVAILABLE,
      payload: Boolean(web3IsAvailable),
    });
    return Boolean(web3IsAvailable);
  } catch (err) {
    log.error(err);
    return false;
  }
}

function * getNetwork() {
  try {
    const networkIsAvailable = yield put({type: NETWORK_CHECK_AVAILABILITY});

    if (!networkIsAvailable) return;

    yield put({type: NETWORK_LOADING});
    yield put({
      type: NETWORK_CHANGED,
      payload: {id: yield bluebird.promisify(window.web3.version.getNetwork)()},
    });
    yield put({type: NETWORK_GET_BALANCE_ETH});
    yield put({type: NETWORK_GET_BALANCE_PLAT});
    yield put({type: NETWORK_BEGIN_LISTENING});
  } catch (error) {
    log.error(error);
  }
}

function networkListenChannel(interval) {
  return eventChannel(emitter => {
    window.web3.eth.filter("latest").watch((error, result) => {
      if (error) {
        log.error(error);
      } else {
        emitter({
          type: NETWORK_NEW_BLOCK,
          payload: result,
        });
      }
    });

    /* Unsubscribe */
    return () => {};
  });
}

function * networkBeginListening() {
  const channel = yield call(networkListenChannel);
  try {
    while (true) {
      const payload = yield take(channel);
      yield put({type: NETWORK_NEW_BLOCK, payload});
    }
  } catch (err) {
    log.error(err);
  }
}


export default function * networkSaga() {
  yield takeLatest(NETWORK_GET, getNetwork);
  yield takeLatest(NETWORK_CHECK_AVAILABILITY, checkNetworkAvailability);
  yield takeLatest(NETWORK_GET_BALANCE_ETH, getBalanceETH);
  yield takeLatest(NETWORK_GET_BALANCE_PLAT, getBalancePLAT);
  yield takeLatest(NETWORK_CHANGED, getRate);
  yield takeLatest(NETWORK_BEGIN_LISTENING, networkBeginListening);
  /* NOTE: Network is bootstrapped when account state resolves */
  yield takeLatest(ACCOUNT_LOGGED_IN, getNetwork);
  yield takeLatest(ACCOUNT_LOGGED_OUT, getNetwork);
  yield takeLatest(RATE_REQUEST, getRate);
}
