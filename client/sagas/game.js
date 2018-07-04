import {takeEvery} from "redux-saga/effects";
import {fetchGame, getGames} from "@/client/actions/game";
import {
  GAME_REQUEST,
  GAMES_REQUEST,
} from "@/shared/constants/actions";

export default function * gameSaga() {
  yield takeEvery(GAME_REQUEST, fetchGame);
  yield takeEvery(GAMES_REQUEST, getGames);
}
