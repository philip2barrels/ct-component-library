#!/usr/bin/env sh

tree -J --noreport --prune src/components > public/components.json
echo "> Created components directory map"

rm -rf public/components
cp -af src/components public/components
echo "> Copied components directory to the public folder"