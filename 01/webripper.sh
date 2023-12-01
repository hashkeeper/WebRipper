#!/bin/bash

# The user-entered URL we will be scraping
url=${1}

source ./src/urlcleaner.sh

# Create master directory, refresh the process
# if something's in there
buildProj () {
  cd ./scrapes
  for a in *; do
    if [ $cursite == $a ]; then
      read -p "Project exists. Overwrite? (Y/n): " ans
      if [ $ans == "y" ] || [ $ans == "Y" ]; then
        rm -r $cursite
        mkdir $cursite
        break
      elif [ $ans == "n" ] || [ $ans == "N" ]; then
        exit
      else
        buildProj;
      fi
      mkdir $cursite
      ls -la
    else
      mkdir $cursite
    fi
  done
  cd $cursite
  curpath=$(pwd)
  cd ../../
}

buildProj

source ./src/scrape.js

echo "exiting main script..."
exit