# PortalClient

## Prereqs + Installation

1. Make sure you have node.js 10.5 installed locally. yarn install will fail since it can't build fsevents.
2. git clone git@github.com:BitGuildPlatform/PortalClient.git
3. cd PortalApi
4. yarn install
5. docker-compose up

## Development

Branches map to environments configured in AWS ECS

- master --> staging env (portalClientService-staging service, https://staging.bitguild.com)
- dev --> dev env (portalClient-dev service, https://dev.bitguild.com)
- production --> production env (portalClientService-prod service, https://www.bitguild.com)

Pushing to one of these branches will automatically kick off the associated build pipeline
in AWS CodePipeline, starting with a new docker image being built and culminating with it
being deployed to the associated ECS cluster.

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

