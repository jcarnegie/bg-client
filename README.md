# PortalClient

## Prereqs + Installation

1. Make sure you have node.js 10.5 installed locally. yarn install will fail since it can't build fsevents.
2. git clone git@github.com:BitGuildPlatform/PortalApi.git
3. git clone git@github.com:BitGuildPlatform/ItemsSync.git
4. git clone git@github.com:BitGuildPlatform/PortalClient.git
5. cd PortalApi
6. yarn install
7. cd ../ItemsSync
8. yarn install
9. cd ../PortalClient
10. yarn install
11. (in a separate terminal): bg-geth-staging  # see useful aliases below
12. docker-compose up

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

## Useful aliases

These are useful aliases to put into your ~/.bash_profile startup script
(Note: hostnames may be out of date - check AWS Console for latest)

# Port Forwarding for local DB connection
alias bg-pg-prod='echo "\"psql -h 127.0.0.1 -p 5433 -U bg_admin portal\" to connect" && ssh -i ~/.ssh/Bastion-Production.pem -L 5433:prod-db-us-east-1.ctawdhjahrgr.us-east-1.rds.amazonaws.com:5432 ubuntu@ec2-35-172-91-78.compute-1.amazonaws.com'
alias bg-pg-staging='echo "\"psql -h 127.0.0.1 -p 5434 -U bg_admin portal\" to connect" && ssh -i ~/.ssh/Bastion-Staging.pem -L 5434:staging-db-us-east-1.ctawdhjahrgr.us-east-1.rds.amazonaws.com:5432 ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com'
alias bg-pg-staging-ropsten='echo "\"psql -h 127.0.0.1 -p 5434 -U bg_admin portal\" to connect" && ssh -i ~/.ssh/Bastion-Staging.pem -L 5434:staging-db-ropsten.ctawdhjahrgr.us-east-1.rds.amazonaws.com:5432 ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com'
alias bg-pg-dev='echo "\"psql -h 127.0.0.1 -p 5435 -U bg_admin portal\" to connect" && ssh -i ~/.ssh/Bastion-Development.pem -L 5435:devdb-us-east-1.ctawdhjahrgr.us-east-1.rds.amazonaws.com:5432 ubuntu@ec2-35-169-92-32.compute-1.amazonaws.com'

# Geth Prod Main Net
alias bg-geth-prod='echo "\"geth attach ws://127.0.0.1:8546\" to connect" && ssh -i ~/.ssh/Bastion-Production.pem -L 8546:10.0.3.89:8546 ubuntu@ec2-35-172-91-78.compute-1.amazonaws.com'
# Geth Staging 1 Main Net
alias bg-geth-staging='echo "\"geth attach ws://127.0.0.1:8546\" to connect" && ssh -i ~/.ssh/Bastion-Staging.pem -L 8546:10.0.2.27:8546 ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com'
# Geth Staging 2 Main Net
alias bg-geth-staging-2='echo "\"geth attach ws://127.0.0.1:8546\" to connect" && ssh -i ~/.ssh/Bastion-Staging.pem -L 8546:10.0.3.85:8546 ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com'
# Geth Staging Rinkeby
alias bg-geth-staging-rinkeby='echo "\"geth attach ws://127.0.0.1:8546\" to connect" && ssh -i ~/.ssh/Bastion-Staging.pem -L 8546:10.0.2.111:8546 ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com'
# Geth Staging Ropsten
alias bg-geth-staging-ropsten='echo "\"geth attach ws://127.0.0.1:8546\" to connect" && ssh -i ~/.ssh/Bastion-Staging.pem -L 8546:10.0.2.12:8546 ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com'
# Geth Staging Kovan
alias bg-geth-staging-kovan='echo "\"geth attach ws://127.0.0.1:8546\" to connect" && ssh -i ~/.ssh/Bastion-Staging.pem -L 8546:10.0.3.15:8546 ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com'
# Geth Development Rinkeby
alias bg-geth-dev-rinkeby='echo "\"geth attach ws://127.0.0.1:8546\" to connect" && ssh -i ~/.ssh/Bastion-Development.pem -L 8546:10.0.2.183:8546 ubuntu@ec2-35-169-92-32.compute-1.amazonaws.com'

# Production Dev Box
alias bg-dev-box-prod='ssh -tt -i ~/.ssh/Bastion-Production.pem ubuntu@ec2-35-172-91-78.compute-1.amazonaws.com ssh -tt -i Bastion-Production.pem ubuntu@10.0.2.80'
# Staging Dev Box
alias bg-dev-box-staging='ssh -tt -i ~/.ssh/Bastion-Staging.pem ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com ssh -tt -i Bastion-Staging.pem ubuntu@10.0.2.226'

# Staging Redis
alias bg-redis-staging='ssh -i ~/.ssh/Bastion-Staging.pem -L 6379:redis-stag.nguc8l.ng.0001.use1.cache.amazonaws.com:6379 ubuntu@ec2-34-203-123-122.compute-1.amazonaws.com'


