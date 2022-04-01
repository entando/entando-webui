rm -rf /tmp/dropbox && mkdir -p /tmp/dropbox
rsync -a -e "ssh -p 2222 -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" git@172.30.130.210:/dropbox/ /tmp/dropbox

if [ -f "/tmp/dropbox/deployment.status.json" ]; then
    echo "Received new update, starting update process..."
    
    if [ 'null' == "$(jq -M '.deploy_finished_time' /tmp/dropbox/deployment.status.json)" ]; then
        echo "Starting update..."
        rm -rf /tmp/app.bak
        cp -r /app /tmp/app.bak
        rm -rf /app/..?* /app/.[!.]* /app/*
        cp -r /tmp/dropbox/. .
        pm2 reload webui-app

        jq '. + {deploy_finished_time: (now|todateiso8601)}' /tmp/dropbox/deployment.status.json > /tmp/dropbox/tmp.$$.json && mv /tmp/dropbox/tmp.$$.json /tmp/dropbox/deployment.status.json
        rsync -a -e "ssh -p 2222 -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" /tmp/dropbox/deployment.status.json git@172.30.130.210:/dropbox/

        rm -rf /tmp/dropbox /tmp/app.bak
        echo "Deployment successfully processed!"
    else
        echo "Deployment already processed. Skipping..."
    fi
else
    echo "No update required..."
fi