supercronic /home/node/updater.crontab > /var/log/supercronic/supercronic.log 2>&1 &

pm2-runtime server.js -i 2 --name webui-app