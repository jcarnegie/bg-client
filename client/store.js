import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import rootReducers from "./reducers/index";
import userSaga from "./sagas/user";
import chatSaga from "./sagas/chat";
import sendBirdSaga from "./sagas/sendbird";


export default function(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunkMiddleware, sagaMiddleware];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development" && !process.env.PORT) {
    // middlewares.push(createLogger());
  }

  if (process.env.NODE_ENV === "development") {
    composeEnhancers = composeWithDevTools;
  }

  const store = createStore(rootReducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));

  const rootSaga = function * () {
    yield all([
      chatSaga(),
      sendBirdSaga(),
      userSaga()
    ]);
  };

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(require.resolve("./reducers"), () => {
      store.replaceReducer(rootReducers);
    });
  }

  return store;
}
