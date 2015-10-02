#!/usr/bin/env bash

THIS_VERSION="2.5.0";
THIS_PLATFORM="darwin";
#use "linux" for linux distro

echo "Downloading io.js tar...";
wget https://iojs.org/dist/v$THIS_VERSION/iojs-v$THIS_VERSION-$THIS_PLATFORM-x64.tar.xz -O iojs;

echo "Untarring io.js tar 'iojs'...";
tar xf iojs;

echo "Deleting io.js tar 'iojs'...";
rm iojs;

echo "Copying io.js binaries to /usr/local/bin...";
sudo cp -R iojs-v$THIS_VERSION-$THIS_PLATFORM-x64/bin/* /usr/local/bin;
sudo cp -R iojs-v$THIS_VERSION-$THIS_PLATFORM-x64/lib/* /usr/local/lib;
sudo rm /usr/local/bin/npm;
sudo ln -s "/usr/local/lib/node_modules/npm/bin/npm-cli.js" /usr/local/bin/npm;

echo "Deleting untarred io.js...";
rm -rf iojs-v$THIS_VERSION-$THIS_PLATFORM-x64;
