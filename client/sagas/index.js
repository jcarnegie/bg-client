import {all} from "redux-saga/effects";
import chatSaga from "./chat";
import metaMaskSaga from "./metamask";
import sendBirdSaga from "./sendbird";
import userSaga from "./user";
import gameSaga from "./game";
import inventorySaga from "./inventory";
import gasSaga from "./gas";

export default function * rootSaga() {
  yield all([
    chatSaga(),
    gameSaga(),
    gasSaga(),
    inventorySaga(),
    metaMaskSaga(),
    sendBirdSaga(),
    userSaga()
  ]);
}
