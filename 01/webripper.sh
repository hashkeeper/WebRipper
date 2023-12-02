#!/bin/bash

# The user-entered URL we will be scraping
url=${1}

source ./src/urlcleaner.sh

# Create master directory, refresh the process
# if something's in there
checkDir () {
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

checkDir
cd $curpath
echo $url > rip.txt

buildProj () {
  for line in $(cat rip.txt)
  do
    node ./../../src/scrape.js $url
  done
}

buildProj

echo "exiting main script..."
exit