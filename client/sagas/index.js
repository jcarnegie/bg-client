import {all} from "redux-saga/effects";
import chatSaga from "./chat";
import metaMaskSaga from "./metamask";
import sendBirdSaga from "./sendbird";
import userSaga from "./user";

export default function * rootSaga() {
  yield all([
    metaMaskSaga(),
    chatSaga(),
    sendBirdSaga(),
    userSaga()
  ]);
}
