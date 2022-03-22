FROM fedora:latest

RUN dnf -y install openssh-server openssh-clients git bash
RUN dnf clean all

RUN chmod 775 /var/run
RUN rm -f /var/run/nologin
RUN ssh-keygen -A #TODO

RUN mkdir -p /git-server/keys /git-server/repos \
  && adduser -s /usr/bin/git-shell git \
  && echo git:12345 | chpasswd \
  && mkdir /home/git/.ssh \
  && touch /home/git/.ssh/authorized_keys \
  && chmod 600 /home/git/.ssh/authorized_keys \
  && chown -R git:git /home/git

COPY plugins/ci-workspace-plugin/sshd_config /etc/ssh/sshd_config
COPY plugins/ci-workspace-plugin/git-shell-commands /home/git/git-shell-commands
COPY plugins/ci-workspace-plugin/start.sh start.sh

RUN chmod -R 775 /etc/ssh
RUN chown root:git /etc/ssh #is this correct?
RUN chmod 664 /etc/ssh/sshd_config
# RUN ln -s /home/git /git-server/repos

EXPOSE 2222
USER git
CMD sh start.sh