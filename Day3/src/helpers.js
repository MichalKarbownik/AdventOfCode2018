function parseData(inputData) {
    inputData = inputData.split("\n");

    //set a regular expression that retrieves numbers
    let regex = /([0-9]*)\d/g;

    //parse input data to contain numerical data from the strings in the form of array of arrays
    return inputData.map(element => {
        return element.match(regex);
    });
}

function fillMaterialField(inputDataArray) {
    //initialize a 1000x1000 array
    let materialField = [...Array(1000)].map(() => Array(1000));

    //for each material claim
    inputDataArray.forEach((claim) => {
        let startingXIndex = parseInt(claim[1]);
        let startingYIndex = parseInt(claim[2]);
        let finishingXIndex = startingXIndex + parseInt(claim[3]);
        let finishingYIndex = startingYIndex + parseInt(claim[4]);

        //on each square inch from starting indexes to finishing indexes in both X and Y axis, increment number of claims
        for(let xCounter = startingXIndex; xCounter < finishingXIndex; xCounter++) {
            for(let yCounter = startingYIndex; yCounter < finishingYIndex; yCounter++) {
                if(!materialField[xCounter][yCounter]) {
                    materialField[xCounter][yCounter] = 1;
                }
                else {
                    materialField[xCounter][yCounter]++;
                }
            }
        }
    });

    return materialField;
}

export function getNumberOfInchesOverlapped(inputData) {
    let materialField = fillMaterialField(parseData(inputData));
    let inchesOverlapped = 0;

    //iterate through the whole material
    materialField.forEach(materialRows => {
        materialRows.forEach(materialColumns => {
            //if there was more than one claim, increment an overlap counter
            if(materialColumns > 1) {
                inchesOverlapped++;
            }
        });
    });

    return inchesOverlapped;
}

export function getNonOverlappingClaimID(inputData) {
    let materialField = fillMaterialField(parseData(inputData));
    let inputDataArray = parseData(inputData);
    let nonOverlappingClaimID = "";

    //for each material claim
    inputDataArray.forEach((claim) => {
        let startingXIndex = parseInt(claim[1]);
        let startingYIndex = parseInt(claim[2]);
        let finishingXIndex = startingXIndex + parseInt(claim[3]);
        let finishingYIndex = startingYIndex + parseInt(claim[4]);
        let isOverlapping = false;

        //on each square inch from starting indexes to finishing indexes in both X and Y axis
        for(let xCounter = startingXIndex; xCounter < finishingXIndex; xCounter++) {
            for(let yCounter = startingYIndex; yCounter < finishingYIndex; yCounter++) {
                //if is overlapping change the flag and break out of both for loops
                if(materialField[xCounter][yCounter] > 1) {
                    isOverlapping = true;
                    break;
                }
            }
            if(isOverlapping) {
                break;
            }
        }

        //if is not overlapping - save the id and break out of the forEach loop
        if(!isOverlapping) {
            nonOverlappingClaimID = claim[0];
            return true;
        }
    });

    return nonOverlappingClaimID;
}