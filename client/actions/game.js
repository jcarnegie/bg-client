import gql from "graphql-tag";
import {call, put} from "redux-saga/effects";
import {path} from "ramda";
import {client} from "@/client/utils/apollo";
import {
  GAME_LOADING,
  GAME_CHANGED,
  GAME_ERROR,
  GAMES_LOADING,
  GAMES_CHANGED,
  GAMES_ERROR,
  MESSAGE_ADD,
} from "@/shared/constants/actions";


export function * fetchGame(action) {
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


export function * getGames() {
  try {
    yield put({
      type: GAMES_LOADING,
    });
    const query = gql`{ listGames { id name slug url api nft } }`;
    const result = yield call(::client.query, {query});
    const games = path(["data", "listGames"], result);
    yield put({
      type: GAMES_CHANGED,
      payload: games,
    });
  } catch (error) {
    yield put({
      type: GAMES_ERROR,
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error,
    });
  }
}
