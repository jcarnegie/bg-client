import {call, put, select, takeEvery} from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {localization} from "../../shared/intl/setup";
import {
  BALANCE_ETH_CHANGED,
  BALANCE_PLAT_CHANGED,
  CREATE_USER,
  INVENTORY_CHANGED,
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  MESSAGE_ADD,
  MESSAGE_ADD_ALL,
  NETWORK_CHANGED,
  SWITCH_LANGUAGE,
  UPDATE_USER,
  USER_CHANGED,
  USER_ERROR,
  USER_LOADING
} from "../../shared/constants/actions";


function callAPI(url, options = {}) {
  const prefix = (process.env.NODE_ENV === "development" ? "http://localhost:7000" : "") + "/api";
  return fetch(prefix + url, options)
    .then(response =>
      response.json().then(json => ({json, response}))
    )
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json.errors);
      }
      return json;
    });
}

function * fetchUser() {
  try {
    yield put({
      type: USER_LOADING
    });
    const account = yield select(state => state.account);
    if (!account.wallet) {
      yield put({
        type: BALANCE_ETH_CHANGED,
        payload: 0
      });
      yield put({
        type: BALANCE_PLAT_CHANGED,
        payload: 0
      });
      yield put({
        type: INVENTORY_ERROR
      });
      return;
    }
    const user = yield call(callAPI, `/user/${account.wallet}`);
    if (user) {
      yield put({
        type: USER_CHANGED,
        payload: user
      });
      yield put({
        type: SWITCH_LANGUAGE,
        ...localization[user.language]
      });
    } else {
      yield put({
        type: USER_ERROR
      });
      yield put({
        type: BALANCE_ETH_CHANGED,
        payload: 0
      });
      yield put({
        type: BALANCE_PLAT_CHANGED,
        payload: 0
      });
    }
  } catch (error) {
    yield put({
      type: USER_ERROR
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error
    });
  }
}

function * createUser(action) {
  try {
    yield put({
      type: USER_LOADING
    });
    const user = yield call(callAPI, "/users", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    yield put({
      type: USER_CHANGED,
      payload: user
    });
  } catch (error) {
    yield put({
      type: USER_ERROR
    });
    yield put({
      type: MESSAGE_ADD_ALL,
      payload: [].concat(error)
    });
  }
}

function * getInventory(action) {
  try {
    yield put({
      type: INVENTORY_LOADING
    });
    const inventory = yield call(callAPI, `/inventory/${action.payload.wallet}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    yield put({
      type: INVENTORY_CHANGED,
      payload: inventory
    });
  } catch (error) {
    yield put({
      type: INVENTORY_ERROR
    });
    yield put({
      type: MESSAGE_ADD_ALL,
      payload: [].concat(error)
    });
  }
}

function * updateUser(action) {
  const user = yield select(state => state.user);
  if (!user.isLoading && user.success) {
    try {
      const _user = yield call(callAPI, `/user/${user.data.wallet}`, {
        method: "PUT",
        body: JSON.stringify(action.payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8"
        }
      });
      yield put({
        type: USER_CHANGED,
        payload: _user
      });
    } catch (error) {
      yield put({
        type: MESSAGE_ADD_ALL,
        payload: [].concat(error)
      });
    }
  }
}

export default function * userSaga() {
  yield takeEvery(NETWORK_CHANGED, fetchUser);
  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(USER_CHANGED, getInventory);
  yield takeEvery(UPDATE_USER, updateUser);
}
