import { INPUT_DATA_PART_ONE } from "./data";
import { checksum, getDifferedByMaxOneCharacter } from "./helpers";

console.log("Answer to the first part is: " + checksum(INPUT_DATA_PART_ONE));
console.log("Answer to the second part is: " + getDifferedByMaxOneCharacter(INPUT_DATA_PART_ONE));