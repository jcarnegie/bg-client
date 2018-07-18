import { call, put, takeEvery } from 'redux-saga/effects';
import { GAS_CHANGED, GAS_LOADING, NETWORK_CHANGED } from '../../shared/constants/actions';
import fetch from 'isomorphic-fetch';
import * as log from 'loglevel';


const defaultData = {
  average: 8,
  fast: 16,
  fastest: 30,
};

function callAPI() {
  try {
    return fetch('https://ethgasstation.info/json/ethgasAPI.json')
      .then(response => response.json());
  } catch (e) {
    log.error('callAPI error:', e);
  }
}

function * fetchGas() {
  try {
    yield put({
      type: GAS_LOADING,
    });
    const json = yield call(callAPI);
    const newData = Object.keys(defaultData)
      .reduce((memo, key) => ({
        ...memo,
        [key]: Number(window.web3.toWei(json[key] / 10, 'shannon')) + 1000000000, // gwei
      }), {});
    yield put({
      type: GAS_CHANGED,
      payload: newData,
    });
  } catch (error) {
    log.error('fetchGas error:', error);

    yield put({
      type: GAS_CHANGED,
      payload: defaultData,
    });
  }
}

export default function * gasSaga() {
  yield takeEvery(NETWORK_CHANGED, fetchGas);
}
