import bluebird from "bluebird";
import {call, put, select, takeEvery} from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import tokenABI from "../../shared/contracts/token";
import oracleABI from "../../shared/contracts/oracle";
import {
  BALANCE_ETH_CHANGED,
  BALANCE_ETH_ERROR,
  BALANCE_ETH_LOADING,
  BALANCE_PLAT_CHANGED,
  BALANCE_PLAT_ERROR,
  BALANCE_PLAT_LOADING,
  CHANGE_ACCOUNT,
  CREATE_USER,
  INVENTORY_CHANGED,
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  MESSAGE_ADD,
  MESSAGE_ADD_ALL,
  NEW_BLOCK,
  RATE_CHANGED,
  RATE_ERROR,
  RATE_LOADING,
  RATE_UPDATE,
  USER_CHANGED,
  USER_ERROR,
  USER_LOADING,
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

function * fetchUser(action) {
  try {
    yield put({
      type: USER_LOADING
    });
    const users = yield call(callAPI, `/users?wallet=${action.payload.wallet}`);
    if (users.length) {
      yield put({
        type: USER_CHANGED,
        payload: users[0]
      });
    } else {
      yield put({
        type: USER_ERROR
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
    const contract = window.web3.eth.contract(oracleABI).at(process.env.ORACLE_CONTRACT_ADDR);
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
      const contract = window.web3.eth.contract(tokenABI).at(process.env.TOKEN_CONTRACT_ADDR);
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
    const inventory = yield call(callAPI, `/inventory?wallet=${action.payload.wallet}`, {
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

function * userSaga() {
  yield takeEvery(CHANGE_ACCOUNT, fetchUser);
  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(USER_CHANGED, getBalanceETH);
  yield takeEvery(NEW_BLOCK, getBalanceETH);
  yield takeEvery(USER_CHANGED, getBalancePLAT);
  yield takeEvery(NEW_BLOCK, getBalancePLAT);
  yield takeEvery(USER_CHANGED, getInventory);
  yield takeEvery(RATE_UPDATE, getRate);
}

export default userSaga;
