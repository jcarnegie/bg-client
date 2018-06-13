# PortalClient

## Next Migration Fix List

TODO
x - css autoprefixer (next does this in production)
- Fix bootstrap navbar collapse warning / replace bootstrap nav w/ custom
- Style jsx / eslint and editor support
- Style updates, component rewrites.
- Mobile, Tablet, Desktop rendering
- Chat-specific style rewrites
- Docker-compose integrates with development GraphQL API
- Update redux-logger for node -- or silence
- Bundle size updates:
- - Remove lodash


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

