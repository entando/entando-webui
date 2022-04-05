FROM gitpod/openvscode-server:1.61.0

USER root

# TODO: revisit this script because it is not trustable, we should either fork it or copy just what we need
RUN bash -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -p nvm \
    -p git

RUN bash -c "$(wget -O- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh)"

# TODO: should we clear cache? Can we use --no-cache?
# TODO should we lock these packages versions?
RUN apt-get install -y git ssh vim supervisor

SHELL ["/bin/zsh", "-ci"]

# Disable telemetry for next.js
ENV NEXT_TELEMETRY_DISABLED='1'

# Install nvm and node
RUN nvm install 14 \
    && nvm use 14 \
    && nvm alias default 14
#    && npm install -g yarn \
#    && yarn config set enableTelemetry 0

# Disable sudo
# RUN rm -f /etc/sudoers.d/openvscode-server

# Copy temporary key for development purposes
RUN mkdir -p /home/openvscode-server/.ssh
COPY plugins/ci-workspace-plugin/keys/id_rsa /home/openvscode-server/.ssh/id_rsa
RUN chown -R openvscode-server:openvscode-server /home/openvscode-server/.ssh
RUN chmod 400 /home/openvscode-server/.ssh/id_rsa

# Copy next.js starter app
COPY starters/barebone-nextjs-engine $HOME/app
# COPY starters/barebone-nextjs-engine/.env.example $HOME/app/.env

# Copy Library Packages
COPY packages/app-engine-client $HOME/packages/app-engine-client
COPY packages/ootb-components $HOME/packages/ootb-components

# Copy App Management Service
COPY services/app-management-service $HOME/services/app-management-service
COPY services/app-management-service/.env.example $HOME/services/app-management-service/.env

RUN chown -R openvscode-server:openvscode-server $HOME
RUN mkdir -p /var/log/supervisor && chown -R openvscode-server:openvscode-server /var/log/supervisor
RUN mkdir -p /var/run/supervisor && chown -R openvscode-server:openvscode-server /var/run/supervisor
RUN chmod -R 755 /usr/lib/python2.7

USER openvscode-server
WORKDIR $HOME

# TODO: these packages should be published on npm
# TODO: app-management-service should be running in 'prod' mode
RUN cd packages/app-engine-client && \
        npm i && \
        npm link && \
        npm run build

RUN cd packages/ootb-components && \
        npm link @entando-webui/app-engine-client && \
        npm i && \
        npm link && \
        npm run build

RUN cd app && \ 
        npm link @entando-webui/app-engine-client && \
        npm link @entando-webui/ootb-components && \
        npm i

RUN cd services/app-management-service && \
        npm link @entando-webui/app-engine-client && \
        npm i


# Configure supervisor
COPY plugins/dev-workspace-plugin/supervisord.conf /etc/supervisord.conf

# Configure vscode
COPY plugins/dev-workspace-plugin/vscode/settings.json $HOME/.vscode/settings.json
# COPY packages/dev-workspace-plugin/vscode/tasks.json $HOME/.vscode/tasks.json


EXPOSE 3000
ENTRYPOINT /usr/bin/supervisord -c /etc/supervisord.conf
