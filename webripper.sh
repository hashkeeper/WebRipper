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

# Create master directory, refresh the process
# if something's in there
buildProj () {
  cd ./website\ scrapes
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

# debug profiles
# echo $url
# echo $cursite
# echo $curpath

python3 "./src/engine.py" $url $cursite

echo "exiting main script..."
exit