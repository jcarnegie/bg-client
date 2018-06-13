import gql from "graphql-tag";
import {call, put, takeEvery} from "redux-saga/effects";
import {path} from "ramda";
import {client} from "../utils/apollo";
import {GAME_CHANGED, GAME_ERROR, GAME_LOADING, GAME_REQUEST, MESSAGE_ADD} from "../../shared/constants/actions";

function * fetchGame(action) {
  try {
    yield put({
      type: GAME_LOADING,
    });

    const query = gql`
      query viewGameBySlug($slug: String!) {
          viewGameBySlug(slug: $slug) {
            id name slug url api nft
          }
      }
    `;

    const variables = {slug: action.payload.slug};
    const result = yield call(::client.query, {query, variables});
    const game = path(["data", "viewGameBySlug"], result);

    if (game) {
      yield put({
        type: GAME_CHANGED,
        payload: game,
      });
    } else {
      yield put({
        type: GAME_ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: GAME_ERROR,
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error,
    });
  }
}

export default function * userSaga() {
  yield takeEvery(GAME_REQUEST, fetchGame);
}
