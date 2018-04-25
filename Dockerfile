FROM node:9.11.1-alpine

RUN apk update
RUN apk add python
RUN apk add build-base
RUN apk add git
RUN apk add bash

RUN mkdir -p /app
WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ADD package.json ./
RUN npm install

ADD . .

CMD NODE_ENV=${NODE_ENV} node_modules/.bin/babel-node server/server.js
