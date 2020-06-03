#!/usr/bin/env sh

tree -Jf --noreport --prune src/components > public/components-manifest.json
echo "> Created components directory map"

rm -rf public/components
cp -af src/components public/components
echo "> Copied components directory to the public folder"