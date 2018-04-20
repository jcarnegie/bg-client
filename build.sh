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
NODE_ENV=production RENDERING=client node_modules/.bin/webpack -p --config server/configs/webpack.production.js
