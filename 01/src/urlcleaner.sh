#!/bin/bash

# The user-entered URL we will be scraping
url=${1}

cursite=$url

# Setting up the directory lattice-work
# Taking website URL, cleaning it up, creating a project directory
if [ ${url::8} == "https://" ] && [ ${url: -1} == "/" ]; then
  cursite=${cursite:8}
  cursite=${cursite::-1}
elif [ ${url::7} == "http://" ] && [ ${url: -1} == "/" ]; then
  cursite=${cursite:7}
  cursite=${cursite::-1}
elif [ ${url::8} == "https://" ]; then
  cursite=${cursite:8}
elif [ ${url::7} == "http://" ]; then
  cursite=${cursite:7}
elif [ ${url: -1} == "/" ]; then
  cursite=${cursite::-1}
fi

if [ ${cursite::4} == "www." ]; then
  cursite=${cursite:4}
fi

if [ ${url::7} != "http://" ] || [ ${url: -1} != "/" ]; then
  url="http://${url}/"
fi

# echo $cursite
# echo $url

echo "URL cleaned, exiting..."
return