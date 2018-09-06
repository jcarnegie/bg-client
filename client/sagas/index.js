import { all } from 'redux-saga/effects';
import bootstrapSaga from './bootstrap';


export default function * rootSaga() {
  yield all([
    bootstrapSaga(),
  ]);
}
