import { eventChannel } from 'redux-saga';
import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { SENDBIRD_INIT, CHAT_MESSAGE_RECEIVED, GLOBAL_HANDLER } from '@/shared/constants/actions';
import * as log from 'loglevel';


function sendBirdListen(state) {
  try {
    return eventChannel(emit => {
    const { sb } = state.chat;
    const channelHandler = new sb.ChannelHandler();

    channelHandler.onMessageReceived = (channel, message) => {
      emit({ type: CHAT_MESSAGE_RECEIVED, payload: { channel, message } });
    };

    sb.addChannelHandler(GLOBAL_HANDLER, channelHandler);

    // unsubscribe function
    return () => {
      };
    });
  } catch (e) {
    log.error('sendBirdListen error:', e);
  }
}

function * initSendBird() {
  try {
    const state = yield select();
    const channel = yield call(sendBirdListen, state);
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (e) {
    log.error('initSendBird error:', e);
  }
}


export default function * sendBirdSaga() {
  yield takeEvery(SENDBIRD_INIT, initSendBird);
};
