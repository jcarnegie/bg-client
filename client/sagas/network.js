import bluebird from 'bluebird';
import * as log from 'loglevel';
import { eventChannel } from 'redux-saga';
import { call, take, put, select, takeLatest } from 'redux-saga/effects';


import {
  NETWORK_GET,
  NETWORK_GET_BALANCE_ETH,
  NETWORK_GET_BALANCE_PLAT,
  ACCOUNT_LOGGED_IN,
  ACCOUNT_LOGGED_OUT,
  NETWORK_BEGIN_LISTENING,
  NETWORK_CHANGED,
  NETWORK_GET_AVAILABILITY,
  NETWORK_AVAILABLE,
  NETWORK_LOADING,
  NETWORK_NEW_BLOCK,
} from '@/shared/constants/actions';


function * checkNetworkAvailability() {
  try {
    const web3IsAvailable = typeof window !== 'undefined' && window.web3;
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
    yield put({ type: NETWORK_GET_AVAILABILITY });

    const network = yield select(state => state.network);

    if (!network.available) return;

    yield put({ type: NETWORK_LOADING });
    yield put({
      type: NETWORK_CHANGED,
      payload: {
        id: yield bluebird.promisify(window.web3.version.getNetwork)(),
      },
    });
    yield put({ type: NETWORK_GET_BALANCE_ETH });
    yield put({ type: NETWORK_GET_BALANCE_PLAT });
    yield put({ type: NETWORK_BEGIN_LISTENING });
  } catch (error) {
    log.error(error);
  }
}

function networkListenChannel(interval) {
  return eventChannel(emitter => {
    window.web3.eth.filter('latest').watch((error, result) => {
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
      yield put({ type: NETWORK_NEW_BLOCK, payload });
    }
  } catch (err) {
    log.error(err);
  }
}


export default function * networkSaga() {
  yield takeLatest(NETWORK_GET, getNetwork);
  yield takeLatest(NETWORK_GET_AVAILABILITY, checkNetworkAvailability);
  yield takeLatest(NETWORK_BEGIN_LISTENING, networkBeginListening);
  /* NOTE: Network is bootstrapped when account state resolves */
  yield takeLatest(ACCOUNT_LOGGED_IN, getNetwork);
  yield takeLatest(ACCOUNT_LOGGED_OUT, getNetwork);
}
