#!/bin/sh

# ssh-keygen -A

echo "export KEYCLOAK_URL=$KEYCLOAK_URL" >> /home/git/.env
echo "export PORTALUI_ADDR=$PORTALUI_ADDR" >> /home/git/.env
echo "export ENTANDO_CORE_API_URL=$ENTANDO_CORE_API_URL" >> /home/git/.env
echo "export KEYCLOAK_URL=$KEYCLOAK_URL" >> /home/git/.env
echo "export KEYCLOAK_REALM=$KEYCLOAK_REALM" >> /home/git/.env
echo "export KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID" >> /home/git/.env
echo "export KEYCLOAK_CLIENT_SECRET=$KEYCLOAK_CLIENT_SECRET" >> /home/git/.env

# If there is some public key in keys folder
# then it copies its contain in authorized_keys file
if [ "$(ls -A /git-server/keys/)" ]; then
  cd /home/git
  cat /git-server/keys/*.pub >> /home/git/.ssh/authorized_keys
  # chown -R git:git .ssh
  # chmod 744 .ssh
  # chmod -R 744 .ssh/*
fi

# Checking permissions and fixing SGID bit in repos folder
# More info: https://github.com/jkarlosb/git-server-docker/issues/1
#if [ "$(ls -A /git-server/repos/)" ]; then
  # cd /git-server/repos
  # chown -R git:git .
  # chmod -R ug+rwX .
  # find . -type d -exec chmod g+s '{}' +
#fi

supercronic /home/git/finalizer.crontab > /var/log/supercronic/supercronic.log 2>&1 &

# -D flag avoids executing sshd as a daemon
/usr/sbin/sshd -D
echo "Finished sshd process..."
