import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import xssFilters from 'xss-filters';
import * as log from 'loglevel';

import {
  isEmpty,
  path,
  pathOr,
} from 'ramda';

import {
  client,
  queries,
  localQueries,
  localMutations,
} from '@/shared/utils/apollo';

import { channels as chatChannels,
  messages as chatMessages,
  sendMessage,
  channelNameForLocale,
  createChannelWithName,
  chatInit,
  findChannelByName,
  setChannelByName,
} from '@/client/utils/chat';

import {
  CHAT_LOAD_MESSAGES,
  CHAT_MESSAGE_SEND,
  CHAT_MESSAGE_SENT,
  CHAT_SET_CHANNEL,
  INIT_CHAT,
  SENDBIRD_INIT,
  UPDATE_USER,
} from '@/shared/constants/actions';


function * sendChatMessage(action) {
  try {
    const state = yield select();
    const { currentChannel } = state.chat;
    const message = action.payload;
    const cleanMsg = xssFilters.inHTMLData(message);

    if (isEmpty(cleanMsg.trim())) {
      return null;
    }

    const rootQuery = yield client.query({ query: localQueries.root });
    const wallet = pathOr('0x0anonymous', ['data', 'wallet'], rootQuery);
    const userQuery = yield client.query({ query: queries.viewUserByWallet, variables: { wallet } });
    const user = path(['data', 'viewUserByWallet'], userQuery);

    if (!user) {
      return client.mutate({ mutation: localMutations.toggleUserRegistrationWorkflow, variables: { on: true } });
    }

    const sentMessage = yield sendMessage(cleanMsg, currentChannel);

    yield put({
      type: CHAT_MESSAGE_SENT,
      payload: sentMessage,
    });

    let analytics = yield select(state => state.analytics);
    analytics.ga.event({
      category: 'Site Interaction',
      action: 'Chat',
      label: 'Send Message',
    });
  } catch (e) {
    log.error('sendChatMessage error:', e);
  }
}

function * initChat(action) {
  try {
    let sb;
    let sbUser;

    const rootQuery = yield client.query({ query: localQueries.root });
    const wallet = pathOr('0x0anonymous', ['data', 'wallet'], rootQuery);
    const userQuery = yield client.query({ query: queries.viewUserByWallet, variables: { wallet } });
    const nickName = pathOr('Guest', ['data', 'viewUserByWallet', 'nickName'], userQuery);


    [sb, sbUser] = yield chatInit(wallet, nickName);

    yield put({
      type: SENDBIRD_INIT,
      payload: { sb, user: sbUser },
    });

    const channels = yield chatChannels(sb);
    const locale = yield select(state => state.intl.locale);
    const channelName = channelNameForLocale(locale);
    const channelOperators = [
      '0xc40cD464ad0895571bB396071A4FaA81935353A5', // Jeff
      '0xa9Af3D88E5167cA6E9413CBB9b946EC95FE469ee', // Shain
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
  yield takeEvery(INIT_CHAT, initChat);
  yield takeEvery(UPDATE_USER, initChat);
}
