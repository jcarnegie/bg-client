import React from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = React.createContext({
  me: null,
  wallet: null,
  // Todo: set other defaults in future?
});


export const withGlobalContext = Component => function ComponentWithGlobalContext(props) {
  return (
    <GlobalContext.Consumer>
      {ctx => <Component ctx={ctx} {...props} />}
    </GlobalContext.Consumer>
  );
};

export const ctxShape = PropTypes.shape({
  me: PropTypes.object,
});
