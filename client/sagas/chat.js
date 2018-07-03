import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import {delay} from "redux-saga";
import xssFilters from "xss-filters";
import * as log from "loglevel";
import {
  isEmpty,
  pathOr,
} from "ramda";

import {channels as chatChannels,
  messages as chatMessages,
  sendMessage,
  channelNameForLocale,
  createChannelWithName,
  chatInit,
  findChannelByName,
  setChannelByName,
} from "@/client/utils/chat";

import {
  SENDBIRD_INIT,
  CHAT_INIT,
  CHAT_LOAD_MESSAGES,
  CHAT_MESSAGE_SEND,
  CHAT_MESSAGE_SENT,
  CHAT_SET_CHANNEL,
  USER_SHOW_REGISTER_WORKFLOW,
} from "@/shared/constants/actions";

const CHAT_THROTTLE = 1000;


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
  yield delay(CHAT_THROTTLE);
  try {
    let sb;
    let sbUser;
    let user = yield select(state => state.user);
    let account = yield select(state => state.account);
    const wallet = pathOr("0x0anonymous", ["wallet"], account);
    const nickName = pathOr("Guest", ["data", "nickName"], user);

    [sb, sbUser] = yield chatInit(wallet, nickName);

    yield put({
      type: SENDBIRD_INIT,
      payload: {sb, user: sbUser},
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
  yield takeLatest(CHAT_INIT, initChat);
}
