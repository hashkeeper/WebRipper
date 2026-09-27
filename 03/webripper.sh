#!/bin/bash

cururl="${1}"

source ./src/urlcleaner.sh $cururl $cursite

node ./src/setup.js $cursite $cururl

exit 0