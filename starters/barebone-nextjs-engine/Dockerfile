ARG NODE_VERSION=fermium
ARG ALPINE_VERSION=3.15

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY .next/standalone .
COPY .next/static .next/static
COPY public public

EXPOSE 3000
ENTRYPOINT node server.js