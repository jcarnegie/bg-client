import {put, select, takeEvery} from "redux-saga/effects";
import sanitizeHtml from "sanitize-html";
import {
  isEmpty,
} from "ramda";
import {channels as chatChannels,
  init as chatInit,
  messages as chatMessages,
  sendMessage,
  channelNameForLocale,
  createChannelWithName,
  findChannelByName,
  setChannelByName
} from "../utils/chat";
import {CHAT_INIT, CHAT_LOAD_MESSAGES, CHAT_MESSAGE_SEND, CHAT_MESSAGE_SENT, CHAT_SET_CHANNEL, USER_CHANGED} from "../../shared/constants/actions";

function * sendChatMessage(action) {
  try {
    const state = yield select();
    const {currentChannel} = state.chat;
    const message = action.payload;

    const cleanMsg = sanitizeHtml(message);
    if (isEmpty(cleanMsg.trim())) {
      return null;
    }

    const sentMessage = yield sendMessage(message, currentChannel);

    yield put({
      type: CHAT_MESSAGE_SENT,
      payload: sentMessage,
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
  const locale = yield select(state => state.intl.locale);
  const channelName = channelNameForLocale(locale);
  const channelOperators = [
    "0xc40cD464ad0895571bB396071A4FaA81935353A5", // Jeff
    "0xa9Af3D88E5167cA6E9413CBB9b946EC95FE469ee" // Shain
  ];

  let channel;

  if (!findChannelByName(channelName, channels)) {
    channel = yield createChannelWithName(channelName, channelOperators);
    channels.push(channel);
  }

  channel = yield setChannelByName(channelName, channels);

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
