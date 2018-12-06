function conductReaction(polymer) {
    let characterCounter = 0;

    //while counter is smaller than string's length
    while(characterCounter < polymer.length) {
        let absOfDifference = Math.abs(polymer.charCodeAt(characterCounter) - polymer.charCodeAt(characterCounter+1));

        //if adjacent letters are the same type but have different capitalization
        if(absOfDifference === 32) {
            //remove them from the string
            polymer = polymer.substr(0, characterCounter) + polymer.substr(2).slice(characterCounter, polymer.length);
            //decrement the counter
            //if the counter is negative, it will have no effect and in the next iteration the counter will increment again
            characterCounter--;
        }
        else {
            characterCounter++
        }
    }

    return polymer;
}

export function getRemainingNumberOfUnits(inputData) {
    let polymerAfterReaction = conductReaction(inputData);

    return polymerAfterReaction.length;
}

function getOppositePolarity(unit) {
    //if it's upper case convert to lower case
    if (unit === unit.toUpperCase()) {
        return unit.toLowerCase();
    }
    //else convert to upper case
    else {
        return unit.toUpperCase();
    }
}

function deleteFaulty(polymer) {
    let deletedCharacterToPolymerMap = new Map();

    for(let characterCounter = 0; characterCounter < polymer.length; characterCounter++) {
        //gets current character
        let currentCharacter = polymer.charAt(characterCounter);
        //gets current character's opposite case
        let currentCharacterOppositeCase = getOppositePolarity(currentCharacter);
        //creates a unique checksum for both characters
        let characterChecksum = currentCharacter.charCodeAt(0) + currentCharacterOppositeCase.charCodeAt(0);

        //if characters haven't been deleted, do it
        if(deletedCharacterToPolymerMap.get(characterChecksum) === undefined) {
            let polymerCopy = polymer;

            let regex = new RegExp(currentCharacter, "g");
            polymerCopy = polymerCopy.replace(regex, '');
            regex = new RegExp(currentCharacterOppositeCase, "g");
            polymerCopy = polymerCopy.replace(regex, '');

            deletedCharacterToPolymerMap.set(characterChecksum, conductReaction(polymerCopy))
        }
    }

    return deletedCharacterToPolymerMap;
}

function getMinimumPolymer(deletedCharacterToPolymerMap) {
    let minimumPolymerCharPair = Array.from(deletedCharacterToPolymerMap).reduce((previousElement, currentElement) => {
        return (previousElement[1].length < currentElement[1].length) ? previousElement : currentElement;
    });

    return minimumPolymerCharPair[1];
}

export function getAnswerForSecondPart(inputData) {
    let polymerAfterReaction = conductReaction(inputData);

    let resultingPolymerMap = deleteFaulty(polymerAfterReaction);
    return getMinimumPolymer(resultingPolymerMap).length;
}


