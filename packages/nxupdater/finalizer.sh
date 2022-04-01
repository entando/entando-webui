
if [ -f "/dropbox/deployment.status.json" ] && [ "null" != "$(jq -M '.deploy_finished_time' /dropbox/deployment.status.json)" ]; then
    echo "Processing deployment conclusion..."
    cd ~/workspace/app
    branch=$(git rev-parse --abbrev-ref HEAD)
    suffix="${branch#"release_"}"

    jq ". + {deploy_finished_time: $(jq -M '.deploy_finished_time' /dropbox/deployment.status.json)}" deployment.status.json > tmp.$$.json && mv tmp.$$.json deployment.status.json
    git add deployment.status.json
    git commit -m "Deploy finished - $suffix"
    git tag DEPLOY_FINISHED_"$suffix"
    git push --atomic --tags origin "$branch"
    
    rm -rf /dropbox/..?* /dropbox/.[!.]* /dropbox/*
    echo "Deployment successfully processed!"
fi