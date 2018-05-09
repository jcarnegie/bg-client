import {call, put, takeEvery} from "redux-saga/effects";
import callAPI from "../utils/api";
import {GAME_CHANGED, GAME_ERROR, GAME_LOADING, GAME_REQUEST, MESSAGE_ADD} from "../../shared/constants/actions";


function * fetchGame(action) {
  try {
    yield put({
      type: GAME_LOADING
    });
    const game = yield call(callAPI, `/game/${action.payload._id}`);
    if (game) {
      yield put({
        type: GAME_CHANGED,
        payload: game
      });
    } else {
      yield put({
        type: GAME_ERROR
      });
    }
  } catch (error) {
    yield put({
      type: GAME_ERROR
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error
    });
  }
}

export default function * userSaga() {
  yield takeEvery(GAME_REQUEST, fetchGame);
}
