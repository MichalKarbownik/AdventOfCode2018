function parseData(inputData) {
    inputData = inputData.split("\n");

    //for all the rows in the input data
    inputData = inputData.map((record) => {
        return {
            //return a Date object
            parsedDate: new Date(extractDate(record)),
            //return guard's ID or null
            guardsID: extractGuardsID(record),
            //return guard's state as 'begins', 'falls' and 'wakes'
            guardsState: extractGuardsState(record)
        }
    });

    return inputData;
}

function extractDate(stringToExtract) {
    return stringToExtract.substr(1, 16);
}

function extractGuardsID(stringToExtract) {
    let regex = '#[0-9]*';
    let guardsID;

    //return guard's ID number (without '#') if it exists in string or null
    if(guardsID = stringToExtract.match(regex)) {
        return guardsID[0];
    }
    else {
        return null;
    }
}

function extractGuardsState(stringToExtract) {
    if(stringToExtract.match('begins')) {
        return 'begins';
    }
    else if(stringToExtract.match('falls')) {
        return 'falls';
    }
    else {
        return 'wakes';
    }
}