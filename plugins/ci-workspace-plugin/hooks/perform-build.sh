#!/bin/sh

set -e
unset GIT_DIR

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

jq -c '. + {started_time: (now|strflocaltime("%r"))}' deployment.status.json >tmp.$$.json && mv tmp.$$.json deployment.status.json

echo "Commits and tag with BUILD_STARTED"
git add deployment.status.json
git commit -m "Build started - $suffix"
git tag BUILD_STARTED_"$suffix"

echo "Runs yarn build"
yarn install
yarn build
deployment_path=/tmp/dropbox/"$(basename "$PWD")"/
mkdir -p "$deployment_path"
cp -r .next "$deployment_path"

jq -c '. + {started_time: (now|strflocaltime("%r"))}' deployment.status.json >tmp.$$.json && mv tmp.$$.json deployment.status.json

echo "Commits and tag with BUILD_FINISHED"
git add .
git commit -m "Build finished - $suffix"
git tag BUILD_FINISHED_"$suffix"

git push --tags
