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
export RENDERING=server
export NODE_ENV=production
export MAINNET_TOKEN_CONTRACT_ADDR=0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE
export MAINNET_TOPUP_CONTRACT_ADDR=0xb3bbc0cc040413a3e68dcaa8f2b6eac2957c5ce0
export MAINNET_ORACLE_CONTRACT_ADDR=0x3127be52acba38beab6b4b3a406dc04e557c037c
export RINKEBY_TOKEN_CONTRACT_ADDR=0x0f2698b7605fe937933538387b3d6fec9211477d
export RINKEBY_TOPUP_CONTRACT_ADDR=0xcc963489d579856b783f2f242af19a32b488b3ea
export RINKEBY_ORACLE_CONTRACT_ADDR=0x20159d575724b68d8a1a80e16fcb874883329114
export SENDBIRD_APP_ID=BB1E0777-B8CE-44DF-BA37-63EBA2E858F1

node_modules/.bin/webpack -p --config server/configs/webpack.production.js
