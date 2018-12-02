function parseData(inputData) {
    inputData = inputData.split("\n");
    return inputData;
}

export function reachesFrequencyTwice(inputData) {
    let frequencyChangesArray = parseData(inputData);
    let resultingFrequency = 0;
    let resultingFrequenciesSet = new Set();

    let counter = 0;

    //while the set doesn't have the resulting frequency already
    while(!resultingFrequenciesSet.has(resultingFrequency)) {
        //add current resulting frequency to the set
        resultingFrequenciesSet.add(resultingFrequency);
        //change current resulting frequency
        resultingFrequency += parseInt(frequencyChangesArray[counter]);

        //increment the counter
        counter++;
        //if the counter equals the array length - reset it (start looping again)
        if(counter === frequencyChangesArray.length) {
            counter = 0;
        }
    }

    return resultingFrequency;
}