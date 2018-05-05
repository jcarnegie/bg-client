FROM node:9.11.1-alpine

RUN apk update
RUN apk add python
RUN apk add build-base
RUN apk add git
RUN apk add bash

RUN mkdir -p /app
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ADD package.json ./
RUN NODE_ENV=development npm install

ADD . .

RUN npm run build

CMD NODE_ENV=${NODE_ENV} node build/server/server.js
