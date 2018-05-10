import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension";
import persistState, {mergePersistedState} from "redux-localstorage";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import rootReducers from "./reducers/index";
import rootSaga from "./sagas";


export default function(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunkMiddleware, sagaMiddleware];

  if (process.env.NODE_ENV === "development" && !process.env.PORT) {
    middlewares.push(createLogger());
  }

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    composeEnhancers = composeWithDevTools;
  }

  const reducers = compose(mergePersistedState())(rootReducers);
  const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares), persistState(void 0, "gitbuild")));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(require.resolve("./reducers"), () => {
      store.replaceReducer(rootReducers);
    });
  }

  return store;
}
