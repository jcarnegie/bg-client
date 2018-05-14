import {call, put, takeEvery} from "redux-saga/effects";
import {GAS_CHANGED, GAS_LOADING, NETWORK_CHANGED} from "../../shared/constants/actions";
import fetch from "isomorphic-fetch";


const defaultData = {
  average: 8,
  fast: 16,
  fastest: 30
};

function callAPI() {
  return fetch("https://ethgasstation.info/json/ethgasAPI.json")
    .then(response => response.json());
}

function * fetchGas() {
  try {
    yield put({
      type: GAS_LOADING
    });
    const json = yield call(callAPI);
    const newData = Object.keys(defaultData)
      .reduce((memo, key) => ({
        ...memo,
        [key]: json[key] / 10 // Number(web3.toWei(json[key] / 10, 'gwei'))
      }), {});
    yield put({
      type: GAS_CHANGED,
      payload: newData
    });
  } catch (error) {
    yield put({
      type: GAS_CHANGED,
      payload: defaultData
    });
  }
}

export default function * gasSaga() {
  yield takeEvery(NETWORK_CHANGED, fetchGas);
}
