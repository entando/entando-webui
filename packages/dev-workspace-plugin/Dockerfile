FROM gitpod/openvscode-server:1.61.0

USER root

RUN bash -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -p nvm \
    -p git

RUN bash -c "$(wget -O- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh)"

# Install supervisor
RUN apt-get install -y supervisor
COPY packages/dev-workspace-plugin/supervisord.conf /etc/supervisord.conf
#RUN touch /var/log/supervisor/supervisord.log && chown -R openvscode-server:openvscode-server /var/log/supervisor

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
#RUN rm -f /etc/sudoers.d/openvscode-server

# Configure vscode
COPY packages/dev-workspace-plugin/vscode/settings.json $HOME/.vscode/settings.json
# COPY packages/dev-workspace-plugin/vscode/tasks.json $HOME/.vscode/tasks.json

# Copy next.js starter app
COPY starters/quickstart-nextjs-starter $HOME/app
COPY starters/quickstart-nextjs-starter/.env.example $HOME/app/.env

# Copy App Engine Client library
COPY packages/app-engine-client $HOME/app-engine-client

# Copy App Management Service
COPY packages/app-management-service $HOME/app-management-service
COPY packages/app-management-service/.env.example $HOME/app-management-service/.env

RUN chown -R openvscode-server:openvscode-server $HOME

WORKDIR $HOME

USER openvscode-server

RUN cd app-engine-client && npm install && npm link \
    && cd ../app \
    && npm link @entando-webui/app-engine-client \
    && npm install \
    && cd ../app-management-service \
    && npm link @entando-webui/app-engine-client \
    && npm install

USER root

ENTRYPOINT /usr/bin/supervisord -c /etc/supervisord.conf
