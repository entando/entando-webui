ARG NODE_VERSION=fermium
ARG ALPINE_VERSION=3.15

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache \
  openssh \
  git \
  bash \
  rsync \
  supercronic \
  jq

RUN npm install pm2 -g

RUN mkdir -p /home/node/.ssh
# Copy temporary key for development purposes
COPY plugins/ci-workspace-plugin/keys/id_rsa /home/node/.ssh/id_rsa

WORKDIR /app

COPY packages/nxupdater/updater.sh /home/node/updater.sh
COPY packages/nxupdater/updater.crontab /home/node/updater.crontab

COPY starters/barebone-nextjs-engine/start.sh start.sh

COPY starters/barebone-nextjs-engine/.next/standalone .
COPY starters/barebone-nextjs-engine/.next/static .next/static
COPY starters/barebone-nextjs-engine/public public

RUN chmod 400 /home/node/.ssh/id_rsa && \
  chown -R node:node /home/node /app && \
  chmod 777 /tmp && chmod -R 755 /app && \
  mkdir /var/log/supercronic && chown -R node:node /var/log/supercronic

EXPOSE 3000
ENTRYPOINT sh start.sh
