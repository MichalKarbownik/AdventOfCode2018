function parseData(inputData) {
    inputData = inputData.split("\n");
    return inputData;
}

function getOccurrences(idsArray) {
    let hadTwoOccurrences = 0, hadThreeOccurrences = 0;

    //for all IDs in the array
    for(let counter = 0; counter < idsArray.length; counter++) {
        let currentID = idsArray[counter];
        let letterOccurrenceMap = new Map();
        let currentCharacter;

        //for all characters in the ID
        for (let characterCounter = 0; characterCounter < currentID.length; characterCounter++) {
            currentCharacter = currentID.charAt(characterCounter);
            let currentNumberOfOccurrences;

            //if there is a record with the current character as a key, increment its value, else add it to the mao with a value of 1
            if((currentNumberOfOccurrences = letterOccurrenceMap.get(currentCharacter)) !== undefined) {
                letterOccurrenceMap.set(currentCharacter, ++currentNumberOfOccurrences);
            }
            else {
                letterOccurrenceMap.set(currentCharacter, 1);
            }
        }

        //convert the map to array
        let letterOccurrenceArray = Array.from(letterOccurrenceMap.values());

        //check if any of the letters occurs twice and increment if positive
        if (letterOccurrenceArray.includes(2)) {
            hadTwoOccurrences++;
        }

        //check if any of the letters occurs three times and increment if positive
        if (letterOccurrenceArray.includes(3)) {
            hadThreeOccurrences++;
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