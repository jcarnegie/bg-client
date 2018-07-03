import gql from "graphql-tag";
import * as log from "loglevel";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {updateIntl} from "react-intl-redux";
import {dissoc, filter, isEmpty, map, merge, path, pickAll, prop, propEq} from "ramda";

import {client} from "@/client/utils/apollo";
import {
  ACCOUNT_CHANGED,
  ACCOUNT_RESET,
  BALANCE_ETH_CHANGED,
  BALANCE_PLAT_CHANGED,
  CREATE_USER,
  CHAT_INIT,
  PRESALE_TRANSACTIONS_CHANGED,
  GAMES_ERROR,
  INVENTORY_ITEMS_ERROR,
  MESSAGE_ADD,
  MESSAGE_ADD_ALL,
  SIGN_OUT_USER,
  UPDATE_USER,
  USER_CHANGED,
  USER_ERROR,
  USER_LOADING,
  USER_RESET,
  VALIDATION_ADD_ALL,
} from "@/shared/constants/actions";
import {localization} from "@/shared/intl/setup";


function * listUserPresaleTickets() {
  const query = gql`
    query listUserPresaleTickets($wallet: String!, $userId: ID!) {
      listUserPresaleTickets(wallet: $wallet, userId: $userId) {
        id wallet setId
      }
    }
  `;

  const account = yield select(state => state.account);
  const user = yield select(state => state.user);

  if (!account.wallet || !user.data) return;

  const variables = {wallet: account.wallet, userId: user.data.id};
  const tx = yield client.query({query, variables});

  try {
    yield put({
      type: PRESALE_TRANSACTIONS_CHANGED,
      payload: {presaleTransactions: tx.data.listUserPresaleTickets},
    });
  } catch (e) {
    log.error(e);
  }
}


function * fetchUser() {
  try {
    yield put({
      type: USER_LOADING,
    });
    const account = yield select(state => state.account);

    if (!account.wallet) {
      yield put({
        type: USER_ERROR,
      });
      yield put({
        type: BALANCE_ETH_CHANGED,
        payload: 0,
      });
      yield put({
        type: BALANCE_PLAT_CHANGED,
        payload: 0,
      });
      yield put({
        type: INVENTORY_ITEMS_ERROR,
      });
      yield put({
        type: GAMES_ERROR,
      });
      return;
    }

    const query = gql`
      query viewUserByWallet($wallet: String!) {
        viewUserByWallet(wallet: $wallet) {
          id wallet nickName email language
        }
      }
    `;

    const variables = {wallet: account.wallet};
    const result = yield client.query({query, variables});
    const user = path(["data", "viewUserByWallet"], result);
    if (user) {
      yield put({
        type: USER_CHANGED,
        payload: user,
      });
      yield put(updateIntl(localization[user.language]));
    } else {
      yield put({
        type: USER_ERROR,
      });
      yield put({
        type: BALANCE_ETH_CHANGED,
        payload: 0,
      });
      yield put({
        type: BALANCE_PLAT_CHANGED,
        payload: 0,
      });
    }
  } catch (error) {
    yield put({
      type: USER_ERROR,
    });
    yield put({
      type: MESSAGE_ADD,
      payload: error,
    });
  } finally {
    yield put({type: CHAT_INIT});
  }
}

function * createUser(action) {
  try {
    yield put({
      type: USER_LOADING,
    });
    const mutation = gql`
      mutation createUser($payload: UserCreatePayload!) {
        createUser(payload: $payload) {
          id wallet nickName email language
        }
      }
    `;
    const intl = yield select(state => state.intl);
    const newUser = merge(action.payload, {language: intl.locale});
    const userFields = ["wallet", "email", "nickName", "language"];
    const variables = {payload: pickAll(userFields, newUser)};
    const user = yield call(::client.mutate, {mutation, variables});

    yield put({
      type: USER_CHANGED,
      payload: user.data.createUser,
    });
  } catch (error) {
    yield put({
      type: USER_ERROR,
    });
    const dupErrors = filter(propEq("name", "UniqueConstraintError"), error.graphQLErrors);
    const dups = map(prop("data"), dupErrors);
    if (!isEmpty(dups)) {
      yield put({
        type: VALIDATION_ADD_ALL,
        payload: dups,
      });
    } else {
      yield put({
        type: MESSAGE_ADD_ALL,
        payload: [error],
      });
    }
  }
}

function * updateUser(action) {
  const user = yield select(state => state.user);
  if (!user.isLoading && user.success) {
    try {
      const mutation = gql`
        mutation updateUser($id: ID!, $payload: UserUpdatePayload!) {
          updateUser(id: $id, payload: $payload) {
            id wallet nickName email language
          }
        }
      `;
      const variables = {id: user.data.id, payload: dissoc("__typename", merge(user.data, action.payload))};
      const _user = path(["data", "updateUser"], yield client.mutate({mutation, variables}));
      yield put({
        type: USER_CHANGED,
        payload: _user,
      });
    } catch (error) {
      const errors = [].concat(error);
      if ([400, 409].includes(errors[0].status)) {
        yield put({
          type: VALIDATION_ADD_ALL,
          payload: errors,
        });
      } else {
        yield put({
          type: MESSAGE_ADD_ALL,
          payload: errors,
        });
      }
    }
  }
}

function * signOutUser(action) {
  yield put({
    type: USER_RESET,
  });
  yield put({
    type: ACCOUNT_RESET,
  });
  yield put({
    type: BALANCE_ETH_CHANGED,
    payload: 0,
  });
  yield put({
    type: BALANCE_PLAT_CHANGED,
    payload: 0,
  });
}

export default function * userSaga() {
  yield takeEvery(ACCOUNT_CHANGED, fetchUser);
  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(UPDATE_USER, updateUser);
  yield takeEvery(SIGN_OUT_USER, signOutUser);
  yield takeEvery(USER_CHANGED, listUserPresaleTickets);
}
