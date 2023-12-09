#!/bin/bash

# The user-entered URL we will be scraping
url=${1}

source ./src/urlcleaner.sh $url

# Create master directory, refresh the process
# if something's in there
checkDir () {
  cd ./scrapes
  for a in *; do
    if [ $cursite == $a ]; then
      read -p "Project exists. Overwrite? (Y/n): " ans00
      if [ $ans00 == "y" ] || [ $ans00 == "Y" ]; then
        rm -r $cursite
        mkdir $cursite
        break
      elif [ $ans00 == "n" ] || [ $ans00 == "N" ]; then
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
    if [ $line == $url ]; then
      node ./../../src/fetch.js $url
      node ./../../src/parseahref.js
    else
      source ./../../src/urlcleaner.sh $line 
      read -p "Scrape following link as well? $line (Y/n):" ans01
      if [ $ans01 == "Y" ] || [ $ans01 == "y" ]; then
        echo $ans01s
      fi
    fi
  done
}

buildProj

echo $url
echo $cursite
echo $curpath

echo "exiting main script..."
exit