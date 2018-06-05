# PortalClient

## Next Migration Fix List

Minor Updates
- Update mobile styles if necessary
- Chat style updates
- css autoprefixer
- Docker-compose integrates with development GraphQL API
- Fix bootstrap navbar collapse warning

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


### Nginx

```
sudo nano /etc/nginx/sites-available/default
sudo nginx -s reload
```
