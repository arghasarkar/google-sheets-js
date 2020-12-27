#!/bin/bash

# Delete dist
rm -rf dist
# Build new production dist
npm run prod

# Copy license
cp LICENSE ./dist

# Copy over the package.json file
cp package.json ./dist

# Copy over README.md
cp README.md ./dist

# Publish
cd dist
npm publish
