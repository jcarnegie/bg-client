#!/usr/bin/env bash

node_modules/.bin/rimraf ./build

node_modules/.bin/babel -d ./build/server ./server --copy-files
node_modules/.bin/babel -d ./build/shared ./shared --copy-files
node_modules/.bin/babel -d ./build/static ./static --copy-files
node_modules/.bin/babel -d ./build/client ./client --copy-files


# there is no way to determinate domain on server side rendering
# i.e i can't pass request.headers.host to window.document.location.host
# so i'm switching to client site rendering until we have proper staging


# TODO switch back to `server` once we have proper staging
export RENDERING=client
export NODE_ENV=production
export MAINNET_TOKEN_CONTRACT_ADDR=0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE
export MAINNET_TOPUP_CONTRACT_ADDR=0x7f3bccf767a2c34a7bc020ef7fe1558afed5160a
export MAINNET_ORACLE_CONTRACT_ADDR=0x2339a01f8424d116ff7cf0869c9c37b769ed274f
export RINKEBY_TOKEN_CONTRACT_ADDR=0x0f2698b7605fe937933538387b3d6fec9211477d
export RINKEBY_TOPUP_CONTRACT_ADDR=0xd9d538ec685dabba1b36b8a4dd69fddc8e50a40a
export RINKEBY_ORACLE_CONTRACT_ADDR=0xf6ccc29b8419e6144e158d122eaf05a5daf0ffab
export SENDBIRD_APP_ID=BB1E0777-B8CE-44DF-BA37-63EBA2E858F1

node_modules/.bin/webpack -p --config server/configs/webpack.production.js
