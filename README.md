# PortalClient

## To Do

General
- Style jsx / eslint and editor support
- Style updates, component rewrites.

Marketplace
  x - Search feature - not doing
  x - Sort feature
  yong - Display for game with no items for sale (done)
  yong - Modals for anonymous user interactions
  yong - Polish Sell modal
  yong - Hook up buy workflows
  x - shain - Reduce flashy loading on game filter click
  x - shain - Remove text select from filters and cards
  shain - Polish filter collapse experience

Inventory
  shain - Apollo user change - switch inventory to new user
  shain - On Sale still renders game titles when when no onsale items exist
  yong - item height is the same with or without expired banner (done)

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
