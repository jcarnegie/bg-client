import {put, takeLatest} from "redux-saga/effects";
import * as log from "loglevel";

import {
  ACCOUNT_INIT,
  APP_INIT,
  APP_RESIZE,
  GA_CREATE,
} from "@/shared/constants/actions";

import BGReactGA from "@/client/utils/react-ga";


function * appInit(action) {
  log.info("Bootstrapping app.");

  yield put({type: APP_RESIZE});

  /* Bootstrap Google Analytics */
  yield put({
    type: GA_CREATE,
    payload: new BGReactGA(process.env.GOOGLE_ANALYTICS_TRACKING_ID),
  });

  /* Bootstrap Account */
  yield put({type: ACCOUNT_INIT});
}


export default function * bootstrapSaga() {
  yield takeLatest(APP_INIT, appInit);
}
