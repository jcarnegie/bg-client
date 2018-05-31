import bluebird from "bluebird";
import gql from "graphql-tag";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {path} from "ramda";
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
import {client} from "../utils/apollo";

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
    const query = gql`
      query listItems($wallet: String!, $userId: ID!, $language: String!, $testItems: Boolean) {
        listItems(wallet: $wallet, userId: $userId, language: $language, testItems: $testItems) {
          id lan tokenId image name description attrs
        }
      }
    `;
    const variables = {wallet, language, userId: user.data.id, testItems};
    const result = yield call(::client.query, {query, variables});
    const items = path(["data", "listItems"], result);
    yield put({
      type: INVENTORY_ITEMS_CHANGED,
      payload: items
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
    const query = gql`{ listGames { id slug url api nft } }`;
    const result = yield call(::client.query, {query});
    const games = path(["data", "listGames"], result);
    yield put({
      type: INVENTORY_GAMES_CHANGED,
      payload: games
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
