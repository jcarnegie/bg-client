# PortalClient

## Next Migration Fix List
Feature Complete
x - SpreadOperator --> SpreadElement warning (babel-plugin-transform-object-rest-spread)
x - Update internationalization
x - Production image runs as expected
x - Game fetching needs to be updated (by id)
x - Production app runs as expected on dev.bitguild.io
x - Styles on each page are matching
x - Update airdrop pages
x - Update FAQ page
x - Modal css loads only after first modal renders
x - After logout, login modal needs to work
x - Update inventory categories render
x - Any updates for Sandbox
x - Browser History
x - Implement "Back to Game" button on inventory page
- Modal initial load style

? - Buy Plat modal needs to work

Updates
- Merge other changes from master, if any
- Merge new ReactGA implementations from Oleg
- Update mobile styles if necessary
x - Clean up unused files

Plus
- Docker-compose integrates with development GraphQL API
- css autoprefixer

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
