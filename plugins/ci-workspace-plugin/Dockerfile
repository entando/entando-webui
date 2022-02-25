FROM nginx:alpine

# "--no-cache" is new in Alpine 3.3 and it avoid using
# "--update + rm -rf /var/cache/apk/*" (to remove cache)
# TODO: should we lock openssh and git versions?
RUN apk add --no-cache \
  openssh \
  git \
  bash

# Initialize the nginx proxy and enable health check
COPY plugins/ci-workspace-plugin/nginx.conf /etc/nginx/conf.d/default.conf
# COPY plugins/ci-workspace-plugin/index.html /usr/share/nginx/html/index.html
COPY plugins/ci-workspace-plugin/health.json /usr/share/nginx/html/health.json

# Key generation on the server
# TODO: this should be done on start.sh otherwise every container instance will use the same host key
RUN ssh-keygen -A

WORKDIR /git-server/

# -D flag avoids password generation
# -s flag changes user's shell
RUN mkdir /git-server/keys \
  && adduser -D -s /usr/bin/git-shell git \
  && echo git:12345 | chpasswd \
  && mkdir /home/git/.ssh

# This is a login shell for SSH accounts to provide restricted Git access.
# It permits execution only of server-side Git commands implementing the
# pull/push functionality, plus custom commands present in a subdirectory
# named git-shell-commands in the user’s home directory.
# More info: https://git-scm.com/docs/git-shell
COPY plugins/ci-workspace-plugin/git-shell-commands /home/git/git-shell-commands

# sshd_config file is edited for enable access key and disable access password
COPY plugins/ci-workspace-plugin/sshd_config /etc/ssh/sshd_config
COPY plugins/ci-workspace-plugin/start.sh /docker-entrypoint.d/40-start-ssh-server.sh
RUN chmod +x /docker-entrypoint.d/40-start-ssh-server.sh

EXPOSE 22
