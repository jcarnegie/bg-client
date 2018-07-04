# PortalClient

## Next Migration Fix List

TODO
- Style jsx / eslint and editor support
- Style updates, component rewrites.
- Chat-specific style rewrites
- Docker-compose integrates with development GraphQL API
- Update redux-logger for node -- or silence


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
