import {put, select, takeEvery} from "redux-saga/effects";
import {sendMessage} from "../utils/chat";
import {
  CHAT_MESSAGE_SEND,
  CHAT_MESSAGE_SENT
} from "../../shared/constants/actions";

function * sendChatMessage(action) {
  const state = yield select();
  const {currentChannel} = state.chat;
  const message = action.payload;
  const sentMessage = yield sendMessage(message, currentChannel);
  yield put({
    type: CHAT_MESSAGE_SENT,
    payload: sentMessage
  });
};

function * chatSaga() {
  yield takeEvery(CHAT_MESSAGE_SEND, sendChatMessage);
};

export default chatSaga;
