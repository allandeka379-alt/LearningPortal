import { checksum8, chk, same } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";
// Control total / checksum example for the lesson.
export const marks = [64, 78, 91, 55, 83, 100, 47, 69];
export const total = marks.reduce((a, b) => a + b, 0);
export const cs = checksum8(marks);
// A transmission error changes one value; another pair of errors cancels out.
export const bad1 = marks.map((m, i) => (i === 3 ? 56 : m));
export const cs1 = checksum8(bad1);
export const bad2 = marks.map((m, i) => (i === 1 ? 79 : i === 5 ? 99 : m));
export const cs2 = checksum8(bad2);
export const swap = marks.map((m, i) => (i === 0 ? marks[1] : i === 1 ? marks[0] : m));
chk(total, 587);
chk(cs, 75);
chk(bad1.reduce((a, b) => a + b, 0), 588);
chk(cs1, 76);
chk(cs2, 75);
chk(checksum8(swap), 75);
needs("security/privacy-integrity", ["= 587", "587 = 2 × 256 + 75", "588 − 512 = 76", "**75**"]);
if (process.argv[1]?.endsWith("w3a-privacy-integrity.mjs")) console.log("lesson values OK");
