import React from 'react';

export const GlobalContext = React.createContext({
  me: null,
  wallet: null,
  // Todo: set other defaults in future?
});

