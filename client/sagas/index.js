import {all} from "redux-saga/effects";
import chatSaga from "./chat";
import metaMaskSaga from "./metamask";
import sendBirdSaga from "./sendbird";
import userSaga from "./user";
import gameSaga from "./game";
import inventorySaga from "./inventory";

export default function * rootSaga() {
  yield all([
    chatSaga(),
    gameSaga(),
    inventorySaga(),
    metaMaskSaga(),
    sendBirdSaga(),
    userSaga()
  ]);
}
