import {call, put, select, takeEvery} from "redux-saga/effects";
import callAPI from "../utils/api";
import {localization} from "../../shared/intl/setup";
import {updateIntl} from "react-intl-redux";
import {
  BALANCE_ETH_CHANGED,
  BALANCE_PLAT_CHANGED,
  CREATE_USER,
  INVENTORY_GAMES_ERROR,
  INVENTORY_ITEMS_ERROR,
  MESSAGE_ADD,
  MESSAGE_ADD_ALL,
  NETWORK_CHANGED,
  UPDATE_USER,
  USER_CHANGED,
  USER_ERROR,
  USER_LOADING,
  VALIDATION_ADD_ALL
} from "../../shared/constants/actions";


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
        type: INVENTORY_ITEMS_ERROR
      });
      yield put({
        type: INVENTORY_GAMES_ERROR
      });
      return;
    }
    const user = yield call(callAPI, `/user/${account.wallet}`);
    if (user) {
      yield put({
        type: USER_CHANGED,
        payload: user
      });
      yield put(updateIntl(localization[user.language]));
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
    const errors = [].concat(error);
    if ([400, 409].includes(errors[0].status)) {
      yield put({
        type: VALIDATION_ADD_ALL,
        payload: errors
      });
    } else {
      yield put({
        type: MESSAGE_ADD_ALL,
        payload: errors
      });
    }
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
      const errors = [].concat(error);
      if ([400, 409].includes(errors[0].status)) {
        yield put({
          type: VALIDATION_ADD_ALL,
          payload: errors
        });
      } else {
        yield put({
          type: MESSAGE_ADD_ALL,
          payload: errors
        });
      }
    }
  }
}

export default function * userSaga() {
  yield takeEvery(NETWORK_CHANGED, fetchUser);
  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(UPDATE_USER, updateUser);
}
