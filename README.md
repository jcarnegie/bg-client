# PortalClient

## To Do

General
- Style jsx / eslint and editor support
- Style updates, component rewrites.

Marketplace
  x - Search feature - not doing
  x - Sort feature
  - Polish filter collapse experience

List of Marketplace translations to get:
- Marketplace
- Games
- On Sale
- Expires in 7 days
- Expires in 1 day
- Expired
- Buy for 1791 PLAT
- RENEW
- WITHDRAW
- BitGuild charges a 5.0% fee on all trades. You will get 2150 PLAT for this sale.
- Sell
- Sell for
- SELL THIS ITEM
- ** get official text for from Max: "No items are listed for this game right now, check back later!"

## Dependencies

## Setup

```bash
yarn
```

## Run

```bash
yarn dev
```

## Build

- To build
```bash
yarn build
```

- To start built files
```bash
yarn start
```

## Test

- To test
```bash
yarn test
```
- To watch tests
```bash
yarn test -- --watch
```

## Bundles

- To view statistics on client output files
- Reports build to .next/analyzer-output
```bash
yarn analyze-bundles
```

## File Structure

- client/
- - actions/
- - reducers/
- - sagas/
- - utils/
- - store.js
- components/
- pages/
- - \_app.js
- - \_document.js
- server/
- shared/
- - constants/
- - contracts/
- - intl/
- static/

## State Management Flows

Bootstrap success flow:

-> APP_INIT
  -> APP_RESIZE
  -> GA_CREATE
  -> ACCOUNT_INIT
    -> ACCOUNT_GET
      -> ACCOUNT_LOGGED_IN
        -> ACCOUNT_BEGIN_POLLING
        -> USER_LOADING
          (success) -> USER_CHANGED
                        -> CHAT_INIT
          (fail) -> USER_ERROR
          (fail) -> ACCOUNT_SIGN_OUT
                        -> CHAT_INIT
      -> ACCOUNT_LOGGED_OUT
        -> ACCOUNT_BEGIN_POLLING
    -> NETWORK_GET
      -> NETWORK_AVAILABLE
      -> NETWORK_LOADING
        -> NETWORK_CHANGED
          (success) -> NETWORK_GET_BALANCE_ETH
          (success) -> NETWORK_GET_BALANCE_PLAT
          (success) -> NETWORK_BEGIN_LISTENING
