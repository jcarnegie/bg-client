import { eventChannel } from 'redux-saga';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import * as log from 'loglevel';

import {
  client,
  queries,
} from '@/shared/utils/apollo';

import {
  ACCOUNT_INIT,
  ACCOUNT_GET,
  ACCOUNT_LOGGED_IN,
  ACCOUNT_LOGGED_OUT,
  ACCOUNT_BEGIN_POLLING,
  ACCOUNT_POLL,
  NETWORK_GET_AVAILABILITY,
} from '@/shared/constants/actions';


/* Poll web3 interface for user account changes with this frequency */
const WEB3_ACCOUNT_POLLING_INTERVAL = process.env.NODE_ENV === 'development' ? 1000 : 200;


function * getAccount() {
  try {
    const account = yield select(state => state.account);
    const network = yield select(state => state.network);

    if (network.available === null) {
      /* Bootstrap Network */
      return yield put({ type: NETWORK_GET_AVAILABILITY });
    }

    /* If web3 is not available, and we have not set initial account state, set account to logged out */
    if (!network.available && !account.success) {
      return yield put({
        type: ACCOUNT_LOGGED_OUT,
        payload: {
          wallet: null,
          success: true,
        },
      });
    } else if (!network.available) {
      log.info('Waiting for user to install web3...');
      /* Check network availability */
      return yield put({ type: NETWORK_GET_AVAILABILITY });
    }

    const web3EthWallets = window.web3.eth.accounts;
    const web3AccountSignedIn = Boolean(web3EthWallets.length);
    const web3EthWallet = web3EthWallets[0];
    const accountInStoreDoesNotMatchWeb3Account = Boolean(web3EthWallet !== account.wallet);
    const noWalletExistsInStore = !account.wallet;
    const userSignedOutBeforeLastTick = !web3AccountSignedIn && !noWalletExistsInStore && account.success;
    const userHasNotSignedIn = !account.success && !web3EthWallet;

    if (web3AccountSignedIn && (noWalletExistsInStore || accountInStoreDoesNotMatchWeb3Account)) {
      yield put({
        type: ACCOUNT_LOGGED_IN,
        payload: {
          wallet: web3EthWallet,
        },
      });

      const { data } = yield client.query({
        query: queries.viewUserByWallet,
        variables: { wallet: web3EthWallet },
      });

      yield client.writeQuery({
        query: queries.viewUserByWallet,
        variables: { wallet: web3EthWallet },
        data,
      });
    } else if (userSignedOutBeforeLastTick || userHasNotSignedIn) {
      yield put({
        type: ACCOUNT_LOGGED_OUT,
        payload: {
          wallet: null,
        },
      });
      yield client.resetStore();
    }
  } catch (err) {
    log.error(err);
  }
}

function * pollForAccountChanges() {
  const channel = yield call(accountPollChannel, WEB3_ACCOUNT_POLLING_INTERVAL);
  try {
    while (true) {
      yield take(channel);
      /* Account poll and account get use the same operations */
      yield put({ type: ACCOUNT_GET });
    }
  } catch (err) {
    log.error(err);
  }
}

function accountPollChannel(interval) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        emitter({ type: ACCOUNT_POLL });
      }, interval);
      /* Unsubscribe */
      return () => clearInterval(iv);
    }
  );
}

function * accountInit() {
  yield put({ type: ACCOUNT_GET });
  yield put({ type: ACCOUNT_BEGIN_POLLING });
}

export default function * accountSaga() {
  yield takeLatest(ACCOUNT_INIT, accountInit);
  yield takeLatest(ACCOUNT_GET, getAccount);
  yield takeLatest(ACCOUNT_BEGIN_POLLING, pollForAccountChanges);
}
