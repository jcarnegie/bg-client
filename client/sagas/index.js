import { all } from 'redux-saga/effects';
import bootstrapSaga from './bootstrap';
import chatSaga from './chat';
import sendBirdSaga from './sendbird';


export default function * rootSaga() {
  yield all([
    bootstrapSaga(),
    chatSaga(),
    sendBirdSaga(),
  ]);
}
