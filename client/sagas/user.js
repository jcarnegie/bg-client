import bluebird from "bluebird";
import {call, put, select, takeEvery} from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import tokenABI from "../../shared/contracts/token";
import oracleABI from "../../shared/contracts/oracle";
import networkConfig from "../utils/network";
import {localization} from "../../shared/intl/setup";
import {
  ACCOUNT_CHANGED,
  BALANCE_ETH_CHANGED,
  BALANCE_ETH_ERROR,
  BALANCE_ETH_LOADING,
  BALANCE_PLAT_CHANGED,
  BALANCE_PLAT_ERROR,
  BALANCE_PLAT_LOADING,
  CREATE_USER,
  INVENTORY_CHANGED,
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  MESSAGE_ADD,
  MESSAGE_ADD_ALL,
  NETWORK_CHANGED,
  NETWORK_ERROR,
  NETWORK_LOADING,
  NEW_BLOCK,
  RATE_CHANGED,
  RATE_ERROR,
  RATE_LOADING,
  SWITCH_LANGUAGE,
  USER_CHANGED,
  USER_ERROR,
  USER_LOADING,
  UPDATE_USER
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

function * getRate() {
  try {
    yield put({
      type: RATE_LOADING
    });
    const network = yield select(state => state.network);
    const contract = window.web3.eth.contract(oracleABI).at(networkConfig[network.data.id].oracle);
    const PLATprice = yield bluebird.promisify(contract.PLATprice)();
    yield put({
      type: RATE_CHANGED,
      payload: 1 / PLATprice.toNumber() * 1e18
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

function * initChat(action) {
  if (window.sbWidget) {
    window.sbWidget.startWithConnect(process.env.SENDBIRD_APP_ID, action.payload.wallet, action.payload.nickName);
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

function * userSaga() {
  yield takeEvery(ACCOUNT_CHANGED, getNetwork);
  yield takeEvery(NETWORK_CHANGED, fetchUser);
  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(USER_CHANGED, initChat);
  yield takeEvery(USER_CHANGED, getBalanceETH);
  yield takeEvery(NEW_BLOCK, getBalanceETH);
  yield takeEvery(USER_CHANGED, getBalancePLAT);
  yield takeEvery(NEW_BLOCK, getBalancePLAT);
  yield takeEvery(USER_CHANGED, getInventory);
  yield takeEvery(NETWORK_CHANGED, getRate);
  yield takeEvery(UPDATE_USER, updateUser);
}

export default userSaga;
