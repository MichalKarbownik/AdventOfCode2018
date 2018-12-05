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