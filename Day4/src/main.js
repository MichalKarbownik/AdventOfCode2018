import {INPUT_DATA} from "./data";
import { getLongestSleepingGuardChecksum, getLongestSleepingOnParticularMinuteGuardChecksum } from "./helpers";

console.log("Answer to the first part is: " + getLongestSleepingGuardChecksum(INPUT_DATA));
console.log("Answer to the second part is: " + getLongestSleepingOnParticularMinuteGuardChecksum(INPUT_DATA));