function parseData(inputData) {
    inputData = inputData.split("\n");
    return inputData;
}

function mapCharactersOccurrences(stringToMap) {
    let letterOccurrenceMap = new Map();

    //for all characters in the string
    Array.from(stringToMap).forEach((currentCharacter) => {
        let currentNumberOfOccurrences;

        //if there is a record with the current character as a key, increment its value, else add it to the mao with a value of 1
        if((currentNumberOfOccurrences = letterOccurrenceMap.get(currentCharacter)) !== undefined) {
            letterOccurrenceMap.set(currentCharacter, ++currentNumberOfOccurrences);
        }
        else {
            letterOccurrenceMap.set(currentCharacter, 1);
        }
    });

    return letterOccurrenceMap;
}

function getOccurrences(idsArray) {
    let hadTwoOccurrences = 0, hadThreeOccurrences = 0;

    //for all IDs in the array
    idsArray.forEach((currentID) => {
        let letterOccurrenceMap = mapCharactersOccurrences(currentID);

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
    });

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

export function getDifferedByMaxOneCharacter(idsArray) {
    idsArray = parseData(idsArray);

    let characterDifferedIndex = 0;
    let correctID = "";

    //for every id in the array
    idsArray.forEach((currentID, currentIDIndex) => {
        let differedByMaxOneCharacter = false;

        //for every remaining id
        for(let secondIDCounter = currentIDIndex + 1; secondIDCounter < idsArray.length; secondIDCounter++) {
            let currentSecondID = idsArray[secondIDCounter];
            let numberOfDifferedCharacters = 0;

            //for all characters of the shorter string
            for(let characterCounter = 0; characterCounter  < currentID.length && currentSecondID.length; characterCounter++) {
                //if the corresponding characters are different, save the their index and increment the counter
                if(currentID[characterCounter] !== currentSecondID[characterCounter]) {
                    characterDifferedIndex = characterCounter;
                    numberOfDifferedCharacters++;
                }
            }

            //if number of different characters was equal or smaller than 1, set a flag to true and save the ID
            if(numberOfDifferedCharacters <= 1) {
                differedByMaxOneCharacter = true;
                correctID = currentID;
            }
        }

        //if a condition of the task is met, break out of forEach loop
        if(differedByMaxOneCharacter) {
            return true;
        }
    });

    //retrieve the string without differing character
    correctID = correctID.slice(0, characterDifferedIndex-1) + correctID.slice(characterDifferedIndex);

    return correctID;
}

