#!/bin/sh

set -e
unset GIT_DIR

# We need this hack because env variables are not accessible from this hook. Any way to enable it?
source /home/git/.env

sleep 1s

# Prepare workspace and clone
workspace=~/workspace
mkdir -p $workspace
temp=${PWD%.git}
app_name=${temp##*/}
repo_path=$PWD
cd $workspace || exit
rm -rf "$app_name"
git clone file://"$repo_path"
cd "$app_name" || exit
suffix="${1#"BUILD_SCHEDULED_"}"
branch="release_${suffix}"
git checkout "$branch"

jq '. + {build_started_time: (now|todateiso8601)}' deployment.status.json > tmp.$$.json && mv tmp.$$.json deployment.status.json

echo "Commits and tag with BUILD_STARTED"
git add deployment.status.json
git commit -m "Build started - $suffix"
git tag BUILD_STARTED_"$suffix"

echo "Runs npm build"
npm install && npm run build

echo "Schedules deployment"
deployment_path=/dropbox/
mkdir -p "$deployment_path" && rm -rf "$deployment_path"/..?* "$deployment_path"/.[!.]* "$deployment_path"/*
cp -r .next/standalone/. public "$deployment_path"
cp -r .next/static "$deployment_path"/.next
jq '. + {build_finished_time: (now|todateiso8601)}' deployment.status.json > tmp.$$.json && mv tmp.$$.json deployment.status.json

echo "Commits and tag with BUILD_FINISHED"
cp -r deployment.status.json "$deployment_path"
git add deployment.status.json
git commit -m "Build finished - $suffix"
git tag BUILD_FINISHED_"$suffix"

git push --atomic --tags origin "$branch"
