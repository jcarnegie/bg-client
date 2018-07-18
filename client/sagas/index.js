import { all } from 'redux-saga/effects';
import accountSaga from './account';
import bootstrapSaga from './bootstrap';
import chatSaga from './chat';
import networkSaga from './network';
import sendBirdSaga from './sendbird';
import userSaga from './user';
import gameSaga from './game';
import inventorySaga from './inventory';
import gasSaga from './gas';

export default function * rootSaga() {
  yield all([
    accountSaga(),
    bootstrapSaga(),
    chatSaga(),
    gameSaga(),
    gasSaga(),
    inventorySaga(),
    networkSaga(),
    sendBirdSaga(),
    userSaga(),
  ]);
}
