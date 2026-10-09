// Lesson numbers for structures/fencing.
import { round, money } from "../lib.mjs";
const treated = 4 / 15, untreated = 1.5 / 3; console.log("per year", round(treated, 2), round(untreated, 2), money(round(treated, 2)), money(round(untreated, 2)));
console.log("over 15 years for 100 posts: treated", 100 * 4, "untreated", 100 * 1.5 * 5);
