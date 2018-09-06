import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducers from '@/client/reducers';
import { defaultLanguage, enabledLanguages } from '@/shared/constants/language';
import { localization } from '@/shared/intl/setup';


const defaultState = {
  intl: {
    locale: defaultLanguage,
    defaultLocale: defaultLanguage,
    enabledLanguages,
    ...(localization[defaultLanguage] || {}),
  },
};

function configureStore(initialState = defaultState) {
  const middlewares = [thunkMiddleware];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = composeWithDevTools;
  }

  const store = createStore(rootReducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(require.resolve('../reducers'), () => {
      store.replaceReducer(rootReducers);
    });
  }

  return store;
}


export default configureStore;
