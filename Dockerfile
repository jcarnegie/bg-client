FROM node:9.11.1-alpine

RUN apk update
RUN apk add python
RUN apk add build-base
RUN apk add git
RUN apk add bash

RUN mkdir -p /app
WORKDIR /app

ARG NODE_ENV=production

ENV RENDERING server
ENV NODE_ENV $NODE_ENV

RUN echo $RENDERING
RUN echo $NODE_ENV

ADD package.json yarn.lock ./

RUN NODE_ENV=development npm install -g -s --no-progress yarn
RUN NODE_ENV=development yarn install

ADD . .

RUN yarnpkg run build

CMD yarnpkg start
