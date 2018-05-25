import bluebird from "bluebird";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {UPDATE as INTL_UPDATE} from "react-intl-redux";
import {
  GIFT_REMOVE_ERROR,
  GIFT_REMOVE_LOADING,
  GIFT_REMOVE_SUCCESS,
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
import {readFromQueryString} from "../utils/location";
import callAPI from "../utils/api";


function * getItems(action) {
  try {
    const {user} = yield select();
    yield put({
      type: INVENTORY_ITEMS_LOADING
    });
    const testItems = (readFromQueryString("testItems") === "true")
      ? "?testItems=true"
      : "";
    const {language, wallet} = user.data;
    const itemsUrl = `/items/${wallet}/${language}${testItems}`;
    const items = yield call(callAPI, itemsUrl, {
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

    gifts.data = gifts.data || []; // TODO - following unsafe operations, ex: map

    yield put({
      type: GIFT_REMOVE_LOADING
    });
    const result = yield Promise.all(gifts.data.map(gift =>
      // will return null while transaction is in process
      bluebird.promisify(window.web3.eth.getTransactionReceipt)(gift.tx)
    ));
    const hashes = result.filter(tx => tx).map(tx => tx.transactionHash);
    yield put({
      type: GIFT_REMOVE_SUCCESS,
      payload: hashes // doesn't matter if tx succeed or failed
    });
  } catch (error) {
    yield put({
      type: GIFT_REMOVE_ERROR
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error
    });
  }
}


export default function * inventorySaga() {
  yield takeEvery(USER_CHANGED, getItems);
  yield takeEvery(INTL_UPDATE, getItems);
  yield takeEvery(INVENTORY_GAMES_REQUEST, getItems);
  yield takeEvery(USER_CHANGED, getGames);
  yield takeEvery(INVENTORY_ITEMS_REQUEST, getGames);
  yield takeEvery(NEW_BLOCK, checkGifts);
}
