// Lesson numbers for protection/weed-control.
import { money, table } from "../lib.mjs";
const wage = 4;
const hand = 2 * 25 * wage; // two hand weedings, 25 person-days/ha each
const herb = 3 * 12 + 2 * wage + 10 * wage; // 3 L/ha at 12, 2 days spraying, one later hand weeding of 10 days
console.log({ hand, herb, diff: hand - herb });
console.log("for 3 ha", hand * 3, herb * 3);
// herbicide per tank: 3 L/ha product, 250 L/ha spray volume, 16 L tank
console.log("mL per tank", 3 * 1000 * 16 / 250);
