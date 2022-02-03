ARG NODE_VERSION=fermium
ARG ALPINE_VERSION=3.15

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json .
COPY .next .next
COPY next.config.js .
COPY node_modules node_modules
COPY public public

EXPOSE 5000
ENTRYPOINT npm run start