#!/bin/bash

# Creating some globals we'll be using a lot based on the
# The user-entered URL we will be scraping
url=${1}

if [ ${url::7} != "http://" ] || [ ${url::8} != "https://" ]; then
  url="http://${url}/"
  url=$(node ./src/fetchurl.js $url)
fi

source ./src/urlcleaner.sh $url

# Create master directory, refresh the process
# if something's in there
checkDir () {
  cd ./scrapes
  for a in *; do
    if [ $cursite == $a ]; then
      read -p "Project exists. Overwrite? (Y/n): " ans01
      if [ $ans01 == "y" ] || [ $ans01 == "Y" ]; then
        rm -r $cursite
        mkdir $cursite
        break
      elif [ $ans01 == "n" ] || [ $ans01 == "N" ]; then
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
  cd $curpath
}

buildProj () {
  echo $url > rip.txt
  node ./../../src/fetchdata.js $url
  node ./../../src/parseahref.js $url
  for line in $(cat rip.txt); do
    source ./../../src/urlcleaner.sh $line 
    read -p "Scrub the following? $line (Y/n):" ans02
    if [ $ans02 == "Y" ] || [ $ans02 == "y" ]; then
      mkdir $line 
      cd ./$line
      ls -la
      node ./../../src/fetchdata.js $line
      node ./../../src/parseahref.js $line
      echo $ans01
    elif [ $ans02 == "N" ] || [ $ans02 == "n" ]; then
      continue
    fi
  done
}

checkDir
buildProj

echo $url
echo $cursite
echo $curpath

echo "exiting main script..."
exit