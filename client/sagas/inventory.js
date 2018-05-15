import bluebird from "bluebird";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {
  GIFT_REMOVE,
  INVENTORY_GAMES_CHANGED,
  INVENTORY_GAMES_ERROR,
  INVENTORY_GAMES_LOADING,
  INVENTORY_GAMES_REQUEST,
  INVENTORY_ITEMS_CHANGED,
  INVENTORY_ITEMS_ERROR,
  INVENTORY_ITEMS_LOADING,
  INVENTORY_ITEMS_REQUEST,
  MESSAGE_ADD,
  NEW_BLOCK,
  USER_CHANGED
} from "../../shared/constants/actions";
import callAPI from "../utils/api";


function * getItems(action) {
  try {
    yield put({
      type: INVENTORY_ITEMS_LOADING
    });
    const items = yield call(callAPI, `/items/${action.payload.wallet}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    yield put({
      type: INVENTORY_ITEMS_CHANGED,
      payload: items.list
    });
  } catch (error) {
    yield put({
      type: INVENTORY_ITEMS_ERROR
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error
    });
  }
}

function * getGames(action) {
  try {
    yield put({
      type: INVENTORY_GAMES_LOADING
    });
    const games = yield call(callAPI, "/games", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    yield put({
      type: INVENTORY_GAMES_CHANGED,
      payload: games.list
    });
  } catch (error) {
    yield put({
      type: INVENTORY_GAMES_ERROR
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error
    });
  }
}

function * checkGifts() {
  try {
    const gifts = yield select(state => state.gifts);
    const result = yield Promise.all(gifts.data.map(gift =>
      // will return null while transaction is in process
      bluebird.promisify(window.web3.eth.getTransactionReceipt)(gift.tx)
    ));
    const hashes = result.filter(tx => tx).map(tx => tx.transactionHash);
    if (hashes.length) {
      yield put({
        type: GIFT_REMOVE,
        payload: hashes // doesn't matter if tx succeed or failed
      });
    }
  } catch (error) {
    // console.error(error);
  }
}


export default function * inventorySaga() {
  yield takeEvery(USER_CHANGED, getItems);
  yield takeEvery(INVENTORY_GAMES_REQUEST, getItems);
  yield takeEvery(USER_CHANGED, getGames);
  yield takeEvery(INVENTORY_ITEMS_REQUEST, getGames);
  yield takeEvery(NEW_BLOCK, checkGifts);
}
