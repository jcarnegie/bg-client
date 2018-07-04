import {eventChannel} from "redux-saga";
import {take, call, put, select, takeLatest} from "redux-saga/effects";
import * as log from "loglevel";

import {
  ACCOUNT_INIT,
  ACCOUNT_GET,
  ACCOUNT_LOGGED_IN,
  ACCOUNT_LOGGED_OUT,
  ACCOUNT_BEGIN_POLLING,
  ACCOUNT_POLL,
} from "@/shared/constants/actions";


/* Poll web3 interface for user account changes with this frequency */
const WEB3_ACCOUNT_POLLING_INTERVAL = 1000;


function * getAccount() {
  const account = yield select(state => state.account);
  const web3EthWallets = window.web3.eth.accounts;
  const web3AccountSignedIn = Boolean(web3EthWallets.length);
  const web3EthWallet = web3EthWallets[0];
  const accountInStoreDoesNotMatchWeb3Account = Boolean(web3EthWallet !== account.wallet);
  const noWalletExistsInStore = !account.wallet;
  const userSignedOutBeforeLastTick = !web3AccountSignedIn && !noWalletExistsInStore && account.success;
  const userHasNotSignedIn = !account.success && !web3EthWallet;

  log.trace(`web3AccountSignedIn: ${web3AccountSignedIn}`);
  log.trace(`noWalletExistsInStore: ${noWalletExistsInStore}`);
  log.trace(`account.wallet: ${account.wallet}`);
  log.trace(`accountInStoreDoesNotMatchWeb3Account: ${accountInStoreDoesNotMatchWeb3Account}`);
  log.trace(`account.success: ${account.success}`);

  if (web3AccountSignedIn && (noWalletExistsInStore || accountInStoreDoesNotMatchWeb3Account)) {
    yield put({
      type: ACCOUNT_LOGGED_IN,
      payload: {
        wallet: web3EthWallet,
      },
    });
  } else if (userSignedOutBeforeLastTick || userHasNotSignedIn) {
    yield put({
      type: ACCOUNT_LOGGED_OUT,
      payload: {
        wallet: null,
      },
    });
  }
}

function * pollForAccountChanges() {
  const channel = yield call(accountPollChannel, WEB3_ACCOUNT_POLLING_INTERVAL);
  try {
    while (true) {
      yield take(channel);
      /* Account poll and account get use the same operations */
      yield put({type: ACCOUNT_GET});
    }
  } catch (err) {
    log.error(err);
  }
}

function accountPollChannel(interval) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        emitter({type: ACCOUNT_POLL});
      }, interval);
      /* Unsubscribe */
      return () => clearInterval(iv);
    }
  );
}

function * accountInit() {
  yield put({type: ACCOUNT_GET});
  yield put({type: ACCOUNT_BEGIN_POLLING});
}

export default function * accountSaga() {
  yield takeLatest(ACCOUNT_INIT, accountInit);
  yield takeLatest(ACCOUNT_GET, getAccount);
  yield takeLatest(ACCOUNT_BEGIN_POLLING, pollForAccountChanges);
}
