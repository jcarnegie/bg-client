# PortalClient

## Next Migration Fix List
x - SpreadOperator --> SpreadElement warning (babel-plugin-transform-object-rest-spread)
x - Update internationalization
x - Production image runs as expected
x - Game fetching needs to be updated (by id)
- Browser History
- Styles on each page are matching
- Production app runs as expected on dev.bitguild.io
- Docker-compose integrates with development GraphQL API
- Update airdrop pages
- Modal css loads only after first modal renders
- Any updates for Sandbox
- Implement "Back to Game" button on inventory page
- Merge new ReactGA implementations from Oleg
- Merge other changes from master, if any
- Update inventory categories render
- Modals
- - Buy Plat modal needs to work
- - After logout, login modal needs to work


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

- To start build files
```bash
yarn start
```

### Nginx

```
sudo nano /etc/nginx/sites-available/default
sudo nginx -s reload
```
