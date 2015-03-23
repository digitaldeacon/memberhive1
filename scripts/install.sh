#!/usr/bin/env sh

sudo npm install -g jspm
sudo npm install -g grunt
npm cache clean; rm -rf node_modules
npm install
jspm install
