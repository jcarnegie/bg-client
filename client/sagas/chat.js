import {put, select, takeEvery, takeLatest, call} from "redux-saga/effects";
import xssFilters from "xss-filters";
import * as log from "loglevel";
import {
  isEmpty,
  pathOr,
} from "ramda";

import {channels as chatChannels,
  init as chatInit,
  messages as chatMessages,
  sendMessage,
  channelNameForLocale,
  createChannelWithName,
  findChannelByName,
  setChannelByName,
} from "@/client/utils/chat";
import {
  CHAT_INIT,
  USER_ERROR,
  CHAT_LOAD_MESSAGES,
  CHAT_MESSAGE_SEND,
  CHAT_MESSAGE_SENT,
  CHAT_SET_CHANNEL,
  USER_CHANGED,
  USER_SHOW_REGISTER_WORKFLOW,
} from "@/shared/constants/actions";

function * sendChatMessage(action) {
  try {
    const state = yield select();
    const {currentChannel} = state.chat;
    const message = action.payload;
    const cleanMsg = xssFilters.inHTMLData(message);

    if (isEmpty(cleanMsg.trim())) {
      return null;
    }

    if (!state.user.data) {
      yield put({
        type: USER_SHOW_REGISTER_WORKFLOW,
        payload: true,
      });
      return;
    }

    const sentMessage = yield sendMessage(cleanMsg, currentChannel);

    yield put({
      type: CHAT_MESSAGE_SENT,
      payload: sentMessage,
    });

    let analytics = yield select(state => state.analytics);
    analytics.ga.event({
      category: "Site Interaction",
      action: "Chat",
      label: "Send Message",
    });
  } catch (e) {
    log.error("sendChatMessage error:", e);
  }
}

function * initChat(action) {
  let sb;

  try {
    let user = yield select(state => state.user);

    if (user.isLoading) {
      log.info("Chat will wait for user API call to resolve.");
      return;
    }

    let chat = yield select(state => state.chat);
    let account = yield select(state => state.account);
    const wallet = pathOr("0x0anonymous", ["wallet"], account);
    const nickName = pathOr("Guest", ["data", "nickName"], user);

    log.info(`Disconnecting chat for user: ${nickName}, wallet: ${wallet}.`);
    yield chat.sb && chat.sb.disconnect();

    log.info(`Initializing chat for user: ${nickName}, wallet: ${wallet}.`);
    [sb, user] = yield call(chatInit, wallet, nickName);

    yield put({
      type: CHAT_INIT,
      payload: {sb, user},
    });

    const channels = yield chatChannels(sb);
    const locale = yield select(state => state.intl.locale);
    const channelName = channelNameForLocale(locale);
    const channelOperators = [
      "0xc40cD464ad0895571bB396071A4FaA81935353A5", // Jeff
      "0xa9Af3D88E5167cA6E9413CBB9b946EC95FE469ee", // Shain
    ];

    let channel;

    if (!findChannelByName(channelName, channels)) {
      channel = yield createChannelWithName(channelName, channelOperators);
      channels.push(channel);
    }

    channel = yield setChannelByName(channelName, channels);

    yield put({
      type: CHAT_SET_CHANNEL,
      payload: channel,
    });

    const messages = yield chatMessages(channel);
    yield put({
      type: CHAT_LOAD_MESSAGES,
      payload: messages,
    });
  } catch (err) {
    log.error(err);
  }
}

export default function * chatSaga() {
  yield takeEvery(CHAT_MESSAGE_SEND, sendChatMessage);
  yield takeEvery("APP_INIT", initChat);
  yield takeLatest(USER_CHANGED, initChat);
  yield takeLatest(USER_ERROR, initChat);
}
