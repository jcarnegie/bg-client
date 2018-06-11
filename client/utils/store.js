import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension";
import persistState, {mergePersistedState} from "redux-localstorage";
import adapter from "redux-localstorage/lib/adapters/localStorage";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import filter from "redux-localstorage-filter";

import rootReducers from "@/client/reducers";
import rootSaga from "@/client/sagas";
import {defaultLanguage, enabledLanguages} from "@/shared/constants/language";
import {localization} from "@/shared/intl/setup";


const defaultState = {
  intl: {
    locale: defaultLanguage,
    defaultLocale: defaultLanguage,
    enabledLanguages,
    ...(localization[defaultLanguage] || {}),
  },
};

function configureStore(initialState = defaultState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunkMiddleware, sagaMiddleware];

  if (process.env.NODE_ENV === "development") {
    // middlewares.push(createLogger());
  }

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    composeEnhancers = composeWithDevTools;
  }

  const mockStorage = {getItem: () => {}, setItem: () => {}};

  const storage = compose(
    filter(["gifts"])
  )(adapter(typeof window !== "undefined" && window.localStorage ? window.localStorage : mockStorage)); // this fixes bug with SSR

  const reducers = compose(mergePersistedState())(rootReducers);
  const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares), persistState(storage, "gitbuild")));

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  // run the rootSaga initially
  store.runSagaTask();

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(require.resolve("../reducers"), () => {
      store.replaceReducer(rootReducers);
    });
  }

  return store;
}


export default configureStore;
