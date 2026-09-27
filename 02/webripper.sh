#!/bin/bash

url=${1}

constr () {
    cd $script_dir/scrapes
    dirCheck=$( ls -la | grep "$cursite")
    if [[ ${} ]]
    echo $dirCheck
}

initRip () {
    url=${1}

    if [[ ${url::7} != "http://" ]] || [[ ${url::8} != "https://" ]]; then
        url="http://${url}/"
    fi

    script_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
    source $script_dir/src/urlcleaner.sh $url

    echo $cururl
    echo $cursite

    constr "$cururl"
}

initRip "$url"