FROM node:10.4-alpine

RUN apk update
RUN apk add python
RUN apk add build-base
RUN apk add git
RUN apk add bash

RUN mkdir -p /app
WORKDIR /app

ARG NODE_ENV=production
ARG DEPLOYED_ENV=production

ENV RENDERING server
ENV NODE_ENV $NODE_ENV
ENV DEPLOYED_ENV $DEPLOYED_ENV

RUN echo $RENDERING
RUN echo $NODE_ENV

ADD package.json yarn.lock ./

RUN NODE_ENV=development yarnpkg install

ADD . .

RUN yarnpkg run build

CMD yarnpkg start
