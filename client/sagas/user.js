import {call, put, takeEvery} from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import {MESSAGE_ADD_ALL} from "../utils/constants/actions";


function callAPI(url, options = {}) {
  const prefix = (process.env.NODE_ENV === "development" ? "http://localhost:5000" : "") + "/api";
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
    const user = yield call(callAPI, `/users?wallet=${action.payload.wallet}`);
    yield put({
      type: "USER_CHANGED",
      payload: user[0] || null
    });
  } catch (error) {
    yield put({
      type: "USER_CHANGED",
      payload: null
    });
    yield put({
      type: MESSAGE_ADD_ALL,
      payload: [].concat(error)
    });
  }
}

function * createUser(action) {
  try {
    const user = yield call(callAPI, "/users", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    yield put({
      type: "USER_CHANGED",
      payload: user
    });
  } catch (error) {
    yield put({
      type: "USER_CHANGED",
      payload: null
    });
    yield put({
      type: MESSAGE_ADD_ALL,
      payload: [].concat(error)
    });
  }
}


function * userSaga() {
  yield takeEvery("CHANGE_ACCOUNT", fetchUser);
  yield takeEvery("CREATE_USER", createUser);
}

export default userSaga;
