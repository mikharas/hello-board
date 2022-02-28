#!/bin/sh

# remove current build
rm -rf build

# build new app
yarn build

# remove everything in public folder of deployment repo
rm -rf ~/hello-board/public/*

# copy all files in build to the deployment repo
cp -r build/* ~/hello-board/public

# switch to hello board
cd ~/hello-board