function usrInpCleaner(inpuT) {
    const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;

    urlArr = inpuT.match(regex);
    urlArr = urlArr.concat(urlArr[3] + urlArr[4]);

    if(urlArr[1] === undefined){
        urlArr = urlArr.concat('http://' + urlArr[6]);
    } else {
        urlArr = urlArr.concat(urlArr[1] + urlArr[6]);
    }

    return urlArr;
}

module.exports = {
    usrInpCleaner
}