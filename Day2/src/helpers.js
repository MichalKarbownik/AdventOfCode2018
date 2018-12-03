function parseData(inputData) {
    inputData = inputData.split("\n");
    return inputData;
}

function getOccurrences(idsArray) {
    let hadTwoOccurrences = 0, hadThreeOccurrences = 0;

    //for all IDs in the array
    for(let counter = 0; counter < idsArray.length; counter++) {
        let currentID = idsArray[counter];
        let letterOccurrenceArray = [];
        let currentCharacter;

        //for all characters in the ID
        for (let characterCounter = 0; characterCounter < currentID.length; characterCounter++) {
            currentCharacter = currentID.charAt(characterCounter);

            //if the array record exists it will return the number of occurrences, if it doesn't it will return 'undefined'
            let currentNumberOfOccurrences = letterOccurrenceArray[currentCharacter];

            //if it is defined - increment, if undefined - assign the first occurrence
            letterOccurrenceArray[currentCharacter] = currentNumberOfOccurrences ? currentNumberOfOccurrences + 1 : 1;
        }

        //iterate through the array and check if any of the letters occurs twice
        for (currentCharacter in letterOccurrenceArray) {
            if (letterOccurrenceArray[currentCharacter] === 2) {
                hadTwoOccurrences++;
                break;
            }
        }

        //iterate through the array and check if any of the letters occurs three times
        for (currentCharacter in letterOccurrenceArray) {
            if (letterOccurrenceArray[currentCharacter] === 3) {
                hadThreeOccurrences++;
                break;
            }
        }
    }

    return {
        hadTwoOccurrences: hadTwoOccurrences,
        hadThreeOccurrences: hadThreeOccurrences
    }
}

export function checksum(inputData) {
    let idsArray = parseData(inputData);
    let occurrences = getOccurrences(idsArray);

    return occurrences.hadTwoOccurrences * occurrences.hadThreeOccurrences;
}