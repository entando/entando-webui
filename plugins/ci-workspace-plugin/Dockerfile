FROM alpine

# "--no-cache" is new in Alpine 3.3 and it avoid using
# "--update + rm -rf /var/cache/apk/*" (to remove cache)
# TODO: should we lock openssh and git versions?
RUN apk add --no-cache \
  openssh \
  git \
  bash \
  nodejs \
  npm

RUN chmod 775 /var/run
RUN rm -f /var/run/nologin

# Initialize the nginx proxy and enable health check
#COPY plugins/ci-workspace-plugin/nginx.conf /etc/nginx/conf.d/default.conf
# COPY plugins/ci-workspace-plugin/index.html /usr/share/nginx/html/index.html
#COPY plugins/ci-workspace-plugin/health.json /usr/share/nginx/html/health.json

# Key generation on the server
# TODO: this should be done on start.sh otherwise every container instance will use the same host key
RUN ssh-keygen -A

# -D flag avoids password generation
# -s flag changes user's shell
RUN mkdir -p /git-server/keys /git-server/repos \
  && adduser -D -s /usr/bin/git-shell git \
  && echo git:12345 | chpasswd \
  && mkdir -p /home/git/.ssh \
  && touch /home/git/.ssh/authorized_keys \
  && chmod 600 /home/git/.ssh/authorized_keys \
  && chown -R git:git /home/git

COPY plugins/ci-workspace-plugin/sshd_config /etc/ssh/sshd_config
COPY plugins/ci-workspace-plugin/start.sh start.sh

# This is a login shell for SSH accounts to provide restricted Git access.
# It permits execution only of server-side Git commands implementing the
# pull/push functionality, plus custom commands present in a subdirectory
# named git-shell-commands in the user’s home directory.
# More info: https://git-scm.com/docs/git-shell
COPY plugins/ci-workspace-plugin/git-shell-commands /home/git/git-shell-commands

RUN chmod -R 775 /etc/ssh
RUN chown root:git /etc/ssh #is this correct?
RUN chmod 664 /etc/ssh/sshd_config
# RUN ln -s /home/git /git-server/repos

USER git
EXPOSE 2222
CMD sh start.sh