import {eventChannel} from "redux-saga";
import {call, put, select, take, takeEvery} from "redux-saga/effects";
import {CHAT_INIT, CHAT_MESSAGE_RECEIVED} from "../../shared/constants/actions";

const GLOBAL_HANDLER = "GLOBAL_HANDLER";

function sendBirdListen(state) {
  return eventChannel(emit => {
    const {sb} = state.chat;
    const channelHandler = new sb.ChannelHandler();

    channelHandler.onMessageReceived = (channel, message) => {
      emit({type: CHAT_MESSAGE_RECEIVED, payload: {channel, message}});
    };

    sb.addChannelHandler(GLOBAL_HANDLER, channelHandler);

    // unsubscribe function
    return () => {
    };
  });
}

function * initSendBird() {
  const state = yield select();
  const channel = yield call(sendBirdListen, state);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function * sendBirdSaga() {
  yield takeEvery(CHAT_INIT, initSendBird);
};
