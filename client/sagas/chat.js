import {put, select, takeEvery} from "redux-saga/effects";
import {channels as chatChannels, init as chatInit, messages as chatMessages, sendMessage, setChannelByName} from "../utils/chat";
import {CHAT_INIT, CHAT_LOAD_MESSAGES, CHAT_MESSAGE_SEND, CHAT_MESSAGE_SENT, CHAT_SET_CHANNEL, USER_CHANGED} from "../../shared/constants/actions";

function * sendChatMessage(action) {
  try {
    const state = yield select();
    const {currentChannel} = state.chat;
    const message = action.payload;
    const sentMessage = yield sendMessage(message, currentChannel);
    yield put({
      type: CHAT_MESSAGE_SENT,
      payload: sentMessage
    });
  } catch (e) {
    console.log("sendChatMessage error:", e);
  }
}

function * initChat(action) {
  const {wallet, nickName} = action.payload;
  const [sb, user] = yield chatInit(wallet, nickName);
  yield put({
    type: CHAT_INIT,
    payload: {sb, user}
  });

  const channels = yield chatChannels(sb);
  const channel = yield setChannelByName(`BitGuild-${process.env.NODE_ENV}`, channels);
  yield put({
    type: CHAT_SET_CHANNEL,
    payload: channel
  });

  const messages = yield chatMessages(channel);
  yield put({
    type: CHAT_LOAD_MESSAGES,
    payload: messages
  });
}

export default function * chatSaga() {
  yield takeEvery(CHAT_MESSAGE_SEND, sendChatMessage);
  yield takeEvery(USER_CHANGED, initChat);
}
