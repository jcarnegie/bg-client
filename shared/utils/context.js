import React from 'react';

export const WalletContext = React.createContext({ wallet: null });

export const withWallet = Component => function ComponentWithWallet(props) {
  return (
    <WalletContext.Consumer>
      {({ wallet }) => {
        return <Component {...props} wallet={wallet} />;
      }}
    </WalletContext.Consumer>
  );
};
