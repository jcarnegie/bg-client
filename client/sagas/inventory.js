import bluebird from "bluebird";
import * as log from "loglevel";
import {put, select, takeEvery} from "redux-saga/effects";

import {
  GIFT_REMOVE_ERROR,
  GIFT_REMOVE_LOADING,
  GIFT_REMOVE_SUCCESS,
  INVENTORY_ITEMS_REQUEST,
  NETWORK_NEW_BLOCK,
} from "@/shared/constants/actions";
import {getGames} from "@/client/actions/game";


function * checkGifts() {
  try {
    const gifts = yield select(state => state.gifts);
    yield put({
      type: GIFT_REMOVE_LOADING,
    });
    const result = yield Promise.all(gifts.data.map(gift =>
      // will return null while transaction is in process
      bluebird.promisify(window.web3.eth.getTransactionReceipt)(gift.tx)
    ));
    const hashes = result.filter(tx => tx).map(tx => tx.transactionHash);
    yield put({
      type: GIFT_REMOVE_SUCCESS,
      payload: hashes, // doesn't matter if tx succeed or failed
    });
  } catch (error) {
    log.error("checkGifts error:", error);

    yield put({
      type: GIFT_REMOVE_ERROR,
    });
  }
}

export default function * inventorySaga() {
  yield takeEvery(INVENTORY_ITEMS_REQUEST, getGames);
  yield takeEvery(NETWORK_NEW_BLOCK, checkGifts);
}
