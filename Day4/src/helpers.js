const GUARD_STATE_BEGINS = 'begins';
const GUARD_STATE_FALLS = 'falls';
const GUARD_STATE_WAKES = 'wakes';

function parseData(inputData) {
    inputData = inputData.split("\n");

    //for all the rows in the input data
    inputData = inputData.map((record) => {
        return {
            //return a Date object
            parsedDate: new Date(extractDate(record)),
            //return guard's ID or null
            guardID: extractGuardID(record),
            //return guard's state as 'begins', 'falls' and 'wakes'
            guardState: extractGuardState(record)
        }
    });

    return inputData;
}

function extractDate(stringToExtract) {
    return stringToExtract.substr(1, 16);
}

function extractGuardID(stringToExtract) {
    let regex = '#[0-9]*';
    let guardID;

    //return guard's ID number (without '#') if it exists in string or null
    if(guardID = stringToExtract.match(regex)) {
        return guardID[0].substr(1);
    }
    else {
        return null;
    }
}

function extractGuardState(stringToExtract) {
    if(stringToExtract.match('begins')) {
        return GUARD_STATE_BEGINS;
    }
    else if(stringToExtract.match('falls')) {
        return GUARD_STATE_FALLS;
    }
    else {
        return GUARD_STATE_WAKES;
    }
}

function mapGuardSleepingTime(parsedSortedData) {
    let currentGuardId, startedSleepingDate;
    let guardSleepingTimeMap = new Map();

    //for each record
    parsedSortedData.forEach((currentRecord) => {
        let guardTotalSleepingTime;

        switch (currentRecord.guardState) {
            case GUARD_STATE_BEGINS:
                currentGuardId = currentRecord.guardID;
                break;
            case GUARD_STATE_FALLS:
                startedSleepingDate = currentRecord.parsedDate;
                //set current record ID to the current ID
                currentRecord.guardID = currentGuardId;
                break;
            case GUARD_STATE_WAKES:
                let guardCurrentSleepingTime = currentRecord.parsedDate - startedSleepingDate;

                //if a guard's ID exists in the Map add the current sleeping time to the old; otherwise set it with current sleeping time
                if((guardTotalSleepingTime = guardSleepingTimeMap.get(currentGuardId)) !== undefined) {
                    guardSleepingTimeMap.set(currentGuardId, guardTotalSleepingTime + guardCurrentSleepingTime);
                }
                else {
                    guardSleepingTimeMap.set(currentGuardId, guardCurrentSleepingTime);
                }

                //set current record ID to the current ID
                currentRecord.guardID = currentGuardId;
                break;
        }
    });

    return guardSleepingTimeMap;
}

function getSleepingMinutesChart(parsedData, guardID) {
    let startedSleepingMinutes;
    //create a new array and fill it with '0'
    let guardSleepingChart = new Array(60).fill(0);

    //for each record
    parsedData.forEach((currentRecord) => {
        if(currentRecord.guardID === guardID) {
            switch (currentRecord.guardState) {
                case GUARD_STATE_BEGINS:
                    break;
                case GUARD_STATE_FALLS:
                    startedSleepingMinutes = currentRecord.parsedDate.getMinutes();
                    break;
                case GUARD_STATE_WAKES:
                    let finishedSleepingMinutes = currentRecord.parsedDate.getMinutes();

                    //for each slept minute, increment its value
                    for(let minutesCounter = startedSleepingMinutes; minutesCounter < finishedSleepingMinutes; minutesCounter++) {
                        guardSleepingChart[minutesCounter]++;
                    }
            }
        }
    });

    return guardSleepingChart;
}

export function getLongestSleepingGuardChecksum(inputData) {
    let parsedData = parseData(inputData);

    //sort by the dates increasingly
    parsedData.sort((first, second) => {
        return first.parsedDate - second.parsedDate;
    });

    //get a map of guard's sleeping time
    let guardSleepingTimeMap = mapGuardSleepingTime(parsedData);

    //Convert Map to Array and iterate to choose the maximum sleeping time; return the guard's ID and the time
    let maxGuardSleepingTimeArray = Array.from(guardSleepingTimeMap).reduce((previousElement, currentElement) => {
        return (previousElement[1] > currentElement[1]) ? previousElement : currentElement
    });

    let longestSleepingGuardID = maxGuardSleepingTimeArray[0];

    //get a chart that visualises how many times the guard slept throughout particular minutes
    let guardSleepingChart = getSleepingMinutesChart(parsedData, longestSleepingGuardID);

    //iterate to choose the minute that was slept throughout the most frequently
    let mostFrequentSleepingMinute = guardSleepingChart.reduce((previousIndex, currentElement, currentIndex, array) => {
        return (currentElement > array[previousIndex]) ? currentIndex : previousIndex;
    });

    //return a checksum
    return longestSleepingGuardID * mostFrequentSleepingMinute;
}